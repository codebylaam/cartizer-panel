import { useTranslation } from "react-i18next"
import { createFileRoute } from "@tanstack/react-router"
import { Button, Center, Text } from "@astryxdesign/core"
import { VStack } from "@astryxdesign/core/VStack"

import { ShopQueryKeys } from "@/constants/query-keys"
import ShopSettingsPage from "@/pages/shop/settings/shop-settings-page"
import type { ShopT } from "@/schemas/shop"
import reactQueryOptions from "@/utils/query-options"

export const Route = createFileRoute("/_authenticated/shop/settings")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const response = await context.queryClient.query(
      reactQueryOptions<ShopT>({
        url: "/shop",
        queryKey: ShopQueryKeys.detail(),
      }),
    )
    return { shop: response.data }
  },
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
})

function RouteComponent() {
  const { shop } = Route.useLoaderData()
  return <ShopSettingsPage shop={shop} />
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
