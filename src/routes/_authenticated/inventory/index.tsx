import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { createFileRoute } from "@tanstack/react-router"

import { filterSchema } from "@/schemas/filter"
import Module from "@/components/module/module"
import generateInventoryListColumns from "@/pages/inventory/columns"
import { Button, Text } from "@astryxdesign/core"

export const Route = createFileRoute("/_authenticated/inventory/")({
  component: RouteComponent,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {},
  errorComponent: ({ error, reset }) => {
    return (
      <div>
        <Text>{error.message}</Text>
        <Button label="reset" onClick={reset}>
          Reset
        </Button>
      </div>
    )
  },
})

function RouteComponent() {
  const { t } = useTranslation()
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const columns = useMemo(() => generateInventoryListColumns(t), [t])

  return (
    <Module navigate={navigate}>
      <Module.Header>
        <Module.Title>{t("page.inventory.title", "Inventory")}</Module.Title>
        <Button
          label={t("page.inventory.add")}
          onClick={() =>
            navigate({ to: "/products/$id", params: { id: "create" } })
          }
        >
          {t("page.inventory.add", "Add Stock")}
        </Button>
      </Module.Header>
      <Module.Content>
        <Module.Filter />
        <Module.DataTable response={data} columns={columns} />
      </Module.Content>
    </Module>
  )
}
