import { EmptyState } from "@astryxdesign/core/EmptyState"
import { Heading } from "@astryxdesign/core/Heading"
import { HStack } from "@astryxdesign/core/HStack"
import { VStack } from "@astryxdesign/core/VStack"
import {
  Table as AstryxTable,
  useTablePagination,
  useTableSortable,
} from "@astryxdesign/core/Table"

import type {
  TableColumn,
  TableDensity,
  TableDividers,
  TablePlugin,
} from "@astryxdesign/core/Table"
import type { UseNavigateResult } from "@tanstack/react-router"
import type { PropsWithChildren, ReactNode } from "react"

import type { GlobalSuccessResponse } from "@/types/response"

import { ModuleContext, useModuleContext } from "@/components/module/context"
import { Filter } from "@/components/module/filter"
import { Card } from "@astryxdesign/core"

type ModuleProps = PropsWithChildren<{
  navigate?: UseNavigateResult<string>
}>
export function Module({ children, navigate }: ModuleProps) {
  return (
    <ModuleContext.Provider value={{ navigate }}>
      <VStack gap={3}>{children}</VStack>
    </ModuleContext.Provider>
  )
}

type HeaderProps = PropsWithChildren
function Header({ children }: HeaderProps) {
  return (
    <HStack justify="between" align="center">
      {children}
    </HStack>
  )
}

function Title({ children }: HeaderProps) {
  return <Heading level={1}>{children}</Heading>
}

type TableProps<T extends Record<string, unknown>> = {
  columns: Array<TableColumn<T>>
  data: Array<T>
  idKey?: (keyof T & string) | ((item: T) => string | number)
  density?: TableDensity
  dividers?: TableDividers
  isStriped?: boolean
  hasHover?: boolean
  plugins?: Record<string, TablePlugin<T>>
  rowIndexStart?: number
  rowCount?: number
  emptyTitle?: string
  emptyDescription?: string
  emptyActions?: ReactNode
}
function Table<T extends Record<string, unknown>>({
  columns,
  data,
  idKey,
  density = "balanced",
  dividers,
  isStriped,
  hasHover,
  plugins,
  rowIndexStart,
  rowCount,
  emptyTitle,
  emptyDescription,
  emptyActions,
}: TableProps<T>) {
  if (data.length === 0 && emptyTitle) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actions={emptyActions}
        isCompact
      />
    )
  }

  return (
    <Card>
      <AstryxTable
        data={data}
        columns={columns}
        idKey={idKey}
        density={density}
        dividers={dividers}
        isStriped={isStriped}
        hasHover={hasHover}
        plugins={plugins}
        rowIndexStart={rowIndexStart}
        rowCount={rowCount}
      />
    </Card>
  )
}

type SortOrder = "asc" | "desc"
type SortChangeHandler<TSortKey extends string> = (
  sortBy: TSortKey | undefined,
  sortOrder: SortOrder | undefined,
) => void

type DataTableProps<
  T extends Record<string, unknown>,
  TSortKey extends string = string,
> = {
  response: GlobalSuccessResponse<T, true>
  columns: Array<TableColumn<T>>
  idKey?: (keyof T & string) | ((item: T) => string | number)
  includePagination?: boolean
  sortBy?: TSortKey
  sortOrder?: SortOrder
  onSortChange?: SortChangeHandler<TSortKey>
  emptyTitle?: string
  emptyDescription?: string
  emptyActions?: ReactNode
  density?: TableDensity
  isStriped?: boolean
  hasHover?: boolean
}
function DataTable<
  T extends Record<string, unknown>,
  TSortKey extends string = string,
>({
  response,
  columns,
  idKey,
  includePagination = true,
  sortBy,
  sortOrder,
  onSortChange,
  emptyTitle,
  emptyDescription,
  emptyActions,
  density,
  isStriped,
  hasHover,
}: DataTableProps<T, TSortKey>) {
  const { navigate } = useModuleContext()
  const pagination = response.meta?.pagination
  const page = pagination?.page ?? 1
  const pageSize = pagination?.limit ?? (response.data.length || 10)
  const totalItems = pagination?.total ?? response.data.length

  const paginationPlugin = useTablePagination<T>({
    page,
    onPageChange: (nextPage) => {
      navigate?.({
        to: ".",
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          page: nextPage,
        }),
      })
    },
    totalItems,
    pageSize,
    align: "end",
  })

  const sortPlugin = useTableSortable<T, TSortKey>({
    sort: sortBy
      ? [
          {
            sortKey: sortBy,
            direction: sortOrder === "desc" ? "descending" : "ascending",
          },
        ]
      : [],
    onSortChange: (sort) => {
      const [entry] = sort
      onSortChange?.(
        entry?.sortKey,
        entry ? (entry.direction === "ascending" ? "asc" : "desc") : undefined,
      )
    },
    allowUnsortedState: true,
  })

  const plugins: Record<string, TablePlugin<T>> = {}
  if (includePagination && pagination) {
    plugins.pagination = paginationPlugin
  }
  if (onSortChange) {
    plugins.sort = sortPlugin
  }

  return (
    <Table
      columns={columns}
      data={response.data}
      idKey={idKey}
      density={density}
      isStriped={isStriped}
      hasHover={hasHover}
      plugins={plugins}
      rowIndexStart={pagination ? (page - 1) * pageSize + 1 : undefined}
      rowCount={pagination?.total}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
      emptyActions={emptyActions}
    />
  )
}

type ContentProps = PropsWithChildren
function Content({ children }: ContentProps) {
  return <VStack gap={3}>{children}</VStack>
}

Module.Header = Header
Module.Title = Title
Module.Table = Table
Module.Content = Content
Module.DataTable = DataTable
Module.Filter = Filter

export default Module
