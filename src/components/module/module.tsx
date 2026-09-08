import { Heading } from "@astryxdesign/core/Heading"
import { HStack } from "@astryxdesign/core/HStack"
import { Pagination } from "@astryxdesign/core/Pagination"
import { Table as AstryxTable } from "@astryxdesign/core/Table"
import { VStack } from "@astryxdesign/core/VStack"

import type { GlobalSuccessResponse } from "@/types/response"
import type { TableColumn } from "@astryxdesign/core/Table"
import type { UseNavigateResult } from "@tanstack/react-router"
import type { PropsWithChildren } from "react"

import { ModuleContext, useModuleContext } from "@/components/module/context"
import { Filter } from "@/components/module/filter"

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
  idKey?: string | ((item: T) => string)
}
function Table<T extends Record<string, unknown>>({
  columns,
  data,
  idKey = "id",
}: TableProps<T>) {
  return (
    <AstryxTable
      data={data}
      columns={columns}
      idKey={idKey}
      density="balanced"
    />
  )
}

type DataTableProps<T extends Record<string, unknown>> = {
  response: GlobalSuccessResponse<T, true>
  columns: Array<TableColumn<T> | any>
  includePagination?: boolean
  idKey?: string | ((item: T) => string)
}
function DataTable<T extends Record<string, unknown>>({
  response,
  columns,
  includePagination = true,
  idKey,
}: DataTableProps<T>) {
  let table = <></>
  let pagination = <></>

  if (response.data.length > 0) {
    table = <Table columns={columns} data={response.data} idKey={idKey} />
    if (
      response.meta &&
      response.meta.pagination.total > 0 &&
      includePagination
    ) {
      pagination = (
        <TablePagination
          totalPages={response.meta.pagination.total}
          currentPage={response.meta.pagination.page}
        />
      )
    }
  }
  return (
    <VStack gap={3}>
      {table}
      {pagination}
    </VStack>
  )
}

type TablePaginationProps = {
  totalPages: number
  currentPage: number
}
function TablePagination({ currentPage, totalPages }: TablePaginationProps) {
  const { navigate } = useModuleContext()
  return (
    <Pagination
      page={currentPage}
      totalPages={totalPages}
      onChange={(page) => {
        navigate?.({
          to: ".",
          search: {
            page,
          },
        })
      }}
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
