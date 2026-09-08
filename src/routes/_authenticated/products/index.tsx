import { useMemo } from "react"
import { Button, Text } from "@astryxdesign/core"
import { useTranslation } from "react-i18next"
import { createFileRoute } from "@tanstack/react-router"

import { filterSchema } from "@/schemas/filter"
import Module from "@/components/module/module"
import generateProductListColumns from "@/pages/products/list/columns"
import reactQueryOptions from "@/utils/query-options"
import type { ProductT } from "@/schemas/product"
import { ProductQueryKeys } from "@/constants/query-keys"

export const Route = createFileRoute("/_authenticated/products/")({
  component: RouteComponent,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps, context }) => {
    const response = await context.queryClient.query(
      reactQueryOptions<ProductT, true>({
        url: "/api/products",
        queryKey: ProductQueryKeys.lists(),
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
  const columns = useMemo(() => generateProductListColumns(t), [t])

  return (
    <Module navigate={navigate}>
      <Module.Header>
        <Module.Title>{t("page.product.title")}</Module.Title>
        <Button
          label="Create Product"
          onClick={() =>
            navigate({ to: "/products/$id", params: { id: "create" } })
          }
        >
          Add Product
        </Button>
      </Module.Header>
      <Module.Content>
        <Module.Filter></Module.Filter>
        <Module.DataTable response={data} columns={columns} />
      </Module.Content>
    </Module>
  )
}
