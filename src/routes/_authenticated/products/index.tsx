import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { VStack } from "@astryxdesign/core/VStack"
import { createFileRoute } from "@tanstack/react-router"
import { Button, Center, Text } from "@astryxdesign/core"

import Module from "@/components/module/module"
import { filterSchema } from "@/schemas/filter"
import type { ProductT } from "@/schemas/product"
import reactQueryOptions from "@/utils/query-options"
import { ProductQueryKeys } from "@/constants/query-keys"
import generateProductListColumns from "@/pages/products/list/columns"

export const Route = createFileRoute("/_authenticated/products/")({
  component: RouteComponent,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps, context }) => {
    const response = await context.queryClient.query(
      reactQueryOptions<ProductT, true>({
        url: "/product/list",
        queryKey: ProductQueryKeys.list(deps),
        config: { params: deps },
      }),
    )
    return response
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

function RouteComponent() {
  const { t } = useTranslation()
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const { sort_by, sort_order } = Route.useSearch()
  const columns = useMemo(() => generateProductListColumns(t), [t])

  return (
    <Module navigate={navigate}>
      <Module.Header>
        <Module.Title>{t("page.product.title")}</Module.Title>
        <Button
          label={t("table_global.create")}
          variant="primary"
          onClick={() =>
            navigate({ to: "/products/$id", params: { id: "create" } })
          }
        />
      </Module.Header>
      <Module.Content>
        <Module.Filter />
        <Module.DataTable
          response={data}
          columns={columns}
          sortBy={sort_by}
          sortOrder={sort_order}
          onSortChange={(nextSortBy, nextSortOrder) =>
            navigate({
              to: ".",
              search: (prev) => ({
                ...prev,
                sort_by: nextSortBy,
                sort_order: nextSortOrder,
                page: 1,
              }),
            })
          }
          emptyTitle={t("page.product.table.empty.title")}
          emptyDescription={t("page.product.table.empty.description")}
          hasHover
        />
      </Module.Content>
    </Module>
  )
}
