import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { createFileRoute } from "@tanstack/react-router"
import { Button, Center, Text } from "@astryxdesign/core"
import { VStack } from "@astryxdesign/core/VStack"

import Module from "@/components/module/module"
import { MediaQueryKeys } from "@/constants/query-keys"
import generateMediaListColumns from "@/pages/medias/columns"
import { filterSchema } from "@/schemas/filter"
import type { MediaT } from "@/schemas/media"
import reactQueryOptions from "@/utils/query-options"

export const Route = createFileRoute("/_authenticated/medias/")({
  component: RouteComponent,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps, context }) => {
    const response = await context.queryClient.query(
      reactQueryOptions<MediaT, true>({
        url: "/media/list",
        queryKey: MediaQueryKeys.list(deps),
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
  const columns = useMemo(() => generateMediaListColumns(t), [t])

  return (
    <Module navigate={navigate}>
      <Module.Header>
        <Module.Title>{t("page.media.title")}</Module.Title>
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
          emptyTitle={t("page.media.table.empty.title")}
          emptyDescription={t("page.media.table.empty.description")}
          hasHover
        />
      </Module.Content>
    </Module>
  )
}
