import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { createFileRoute } from "@tanstack/react-router"
import { Button, Center, Text } from "@astryxdesign/core"
import { VStack } from "@astryxdesign/core/VStack"

import Module from "@/components/module/module"
import { CustomerQueryKeys } from "@/constants/query-keys"
import { CreateCustomerModal } from "@/pages/customers/components/create-customer-modal"
import generateCustomerListColumns from "@/pages/customers/list/columns"
import { filterSchema } from "@/schemas/filter"
import type { CustomerT } from "@/schemas/customer"
import reactQueryOptions from "@/utils/query-options"

export const Route = createFileRoute("/_authenticated/customers/")({
  component: RouteComponent,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps, context }) => {
    const response = await context.queryClient.query(
      reactQueryOptions<CustomerT, true>({
        url: "/customer/list",
        queryKey: CustomerQueryKeys.list(deps),
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
  const columns = useMemo(() => generateCustomerListColumns(t), [t])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <Module navigate={navigate}>
      <Module.Header>
        <Module.Title>{t("page.customer.title")}</Module.Title>
        <Button
          label={t("page.customer.add")}
          variant="primary"
          onClick={() => setIsModalOpen(true)}
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
          emptyTitle={t("page.customer.table.empty.title")}
          emptyDescription={t("page.customer.table.empty.description")}
          hasHover
        />
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
