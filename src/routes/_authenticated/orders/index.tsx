import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { createFileRoute } from "@tanstack/react-router"

import { filterSchema } from "@/schemas/filter"
import Module from "@/components/module/module"
import generateOrderListColumns from "@/pages/orders/list/columns"
import { Button, Text } from "@astryxdesign/core"
import reactQueryOptions from "@/utils/query-options"
import type { OrderT } from "@/schemas/order"
import { OrderQueryKeys } from "@/constants/query-keys"

export const Route = createFileRoute("/_authenticated/orders/")({
  component: RouteComponent,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps, context }) => {
    const response = await context.queryClient.query(
      reactQueryOptions<OrderT, true>({
        url: "/api/orders",
        queryKey: OrderQueryKeys.lists(),
      }),
    )
    return response
  },
  errorComponent: ({ error, reset }) => {
    return (
      <div>
        <Text>{error.message}</Text>
        <Button label="Reset" onClick={reset} />
      </div>
    )
  },
})

function RouteComponent() {
  const { t } = useTranslation()
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const columns = useMemo(() => generateOrderListColumns(t), [t])

  return (
    <Module navigate={navigate}>
      <Module.Header>
        <Module.Title>{t("page.order.title")}</Module.Title>
        <Button
          label={t("page.order.add")}
          onClick={() => navigate({ to: "/orders/create" })}
        />
      </Module.Header>
      <Module.Content>
        <Module.Filter />
        <Module.DataTable response={data} columns={columns} />
      </Module.Content>
    </Module>
  )
}
