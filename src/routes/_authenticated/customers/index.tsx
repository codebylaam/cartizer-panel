import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createFileRoute } from "@tanstack/react-router"

import { filterSchema } from "@/schemas/filter"
import Module from "@/components/module/module"
import generateCustomerListColumns from "@/pages/customers/list/columns"
import { CreateCustomerModal } from "@/pages/customers/components/create-customer-modal"
import { Button, Text } from "@astryxdesign/core"

export const Route = createFileRoute("/_authenticated/customers/")({
  component: RouteComponent,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {},
  errorComponent: ({ error, reset }) => {
    return (
      <div>
        <Text>{error.message}</Text>
        <Button label="Reset" onClick={reset}>
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
  const columns = useMemo(() => generateCustomerListColumns(t), [t])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <Module navigate={navigate}>
      <Module.Header>
        <Module.Title>{t("page.customer.title", "Customers")}</Module.Title>
        <Button
          label={t("page.customer.add")}
          onClick={() => setIsModalOpen(true)}
        />
      </Module.Header>
      <Module.Content>
        <Module.Filter />
        <Module.DataTable response={data} columns={columns} />
      </Module.Content>

      <CreateCustomerModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={() => {
          navigate({ to: "/customers", replace: true })
        }}
      />
    </Module>
  )
}
