import { useTranslation } from "react-i18next"
import { createFileRoute } from "@tanstack/react-router"
import { Button, Center, Text } from "@astryxdesign/core"
import { VStack } from "@astryxdesign/core/VStack"

import { OrderQueryKeys } from "@/constants/query-keys"
import OrderDetailPage from "@/pages/orders/detail/order-detail-page"
import type { OrderT } from "@/schemas/order"
import reactQueryOptions from "@/utils/query-options"

export const Route = createFileRoute("/_authenticated/orders/$id/")({
  component: OrderDetailPage,
  loader: async ({ params, context }) => {
    const response = await context.queryClient.query(
      reactQueryOptions<OrderT>({
        url: `/order/${params.id}`,
        queryKey: OrderQueryKeys.detail(params.id),
      }),
    )
    return { order: response.data }
  },
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
