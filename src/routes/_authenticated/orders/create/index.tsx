import { useTranslation } from "react-i18next"
import { createFileRoute } from "@tanstack/react-router"
import { Button, Center, Text } from "@astryxdesign/core"
import { VStack } from "@astryxdesign/core/VStack"

import { ProductQueryKeys } from "@/constants/query-keys"
import CreateOrderPage from "@/pages/orders/create-order/create-order-page"
import type { ProductT } from "@/schemas/product"
import reactQueryOptions from "@/utils/query-options"

export const Route = createFileRoute("/_authenticated/orders/create/")({
  component: CreateOrderPage,
  loader: ({ context }) =>
    context.queryClient.query(
      reactQueryOptions<ProductT, true>({
        url: "/product/list",
        queryKey: ProductQueryKeys.lists(),
      }),
    ),
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
})

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
