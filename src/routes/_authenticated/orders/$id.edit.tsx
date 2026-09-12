import { useTranslation } from "react-i18next"
import { createFileRoute } from "@tanstack/react-router"
import { Button, Center, Text } from "@astryxdesign/core"
import { VStack } from "@astryxdesign/core/VStack"

import { OrderQueryKeys, ProductQueryKeys } from "@/constants/query-keys"
import OrderFormPage from "@/pages/orders/create-order/create-order-page"
import type { OrderT } from "@/schemas/order"
import type { ProductT } from "@/schemas/product"
import reactQueryOptions from "@/utils/query-options"

export const Route = createFileRoute("/_authenticated/orders/$id/edit")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const [products, order] = await Promise.all([
      context.queryClient.query(
        reactQueryOptions<ProductT, true>({
          url: "/product/list",
          queryKey: ProductQueryKeys.lists(),
        }),
      ),
      context.queryClient.query(
        reactQueryOptions<OrderT>({
          url: `/order/${params.id}`,
          queryKey: OrderQueryKeys.detail(params.id),
        }),
      ),
    ])
    return { products: products.data, order: order.data }
  },
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
})

function RouteComponent() {
  const { products, order } = Route.useLoaderData()
  return <OrderFormPage products={products} order={order} />
}

function PendingComponent() {
  const { t } = useTranslation()
  return (
    <Center axis="both" style={{ minHeight: "100%" }}>
      <Text type="body" color="secondary">
        {t("table_global.loading")}
      </Text>
    </Center>
  )
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const { t } = useTranslation()
  return (
    <Center axis="both" style={{ minHeight: "100%" }}>
      <VStack gap={3} hAlign="center">
        <Text type="body" color="secondary">
          {error.message}
        </Text>
        <Button label={t("table_global.retry")} onClick={reset} />
      </VStack>
    </Center>
  )
}
