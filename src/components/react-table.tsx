import { useState } from 'react'
import {
  Table as AstryxTable,
  useTableSelection,
  useTableSelectionState,
} from '@astryxdesign/core/Table'
import type { TableColumn } from '@astryxdesign/core/Table'

type ReactTableProps<T extends Record<string, unknown>> = {
  table?: any
  data?: Array<T>
  columns?: Array<TableColumn<T> | any>
  selectedKeys?: Set<string>
  setSelectedKeys?: React.Dispatch<React.SetStateAction<Set<string>>>
  idKey?: string | ((item: T) => string)
}

export default function ReactTable<T extends Record<string, unknown>>({
  table,
  data: dataProp,
  columns: columnsProp,
  selectedKeys: externalSelectedKeys,
  setSelectedKeys: externalSetSelectedKeys,
  idKey = 'id',
}: ReactTableProps<T>) {
  const data: Array<T> = dataProp || table?.options?.data || []
  const rawColumns: Array<any> = columnsProp || table?.options?.columns || []

  const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<string>>(
    new Set(),
  )
  const selectedKeys = externalSelectedKeys ?? internalSelectedKeys
  const setSelectedKeys = externalSetSelectedKeys ?? setInternalSelectedKeys

  const resolveIdKey = (item: T): string => {
    if (typeof idKey === 'function') {
      return String(idKey(item))
    }
    return String((item as any)[idKey] ?? (item as any).id ?? Math.random())
  }

  const { selectionConfig } = useTableSelectionState<T>({
    data,
    idKey: resolveIdKey,
    selectedKeys,
    setSelectedKeys,
  })
  const selectionPlugin = useTableSelection<T>(selectionConfig)

  const hasSelectCol = rawColumns.some(
    (col) => col.key === 'select' || col.id === 'select',
  )
  const filteredColumns = hasSelectCol
    ? rawColumns.filter((col) => col.key !== 'select' && col.id !== 'select')
    : rawColumns

  const columns: Array<TableColumn<T>> = filteredColumns.map(
    (col: any, index: number) => {
      const key = String(col.key || col.id || col.accessorKey || index)
      const header =
        typeof col.header === 'function'
          ? col.header({ table: table ?? {} })
          : (col.header ?? key)

      let renderCell: ((item: T) => React.ReactNode) | undefined =
        col.renderCell

      if (!renderCell && typeof col.cell === 'function') {
        renderCell = (item: T) => {
          const val = (item as any)[key]
          return col.cell({
            getValue: () => val,
            row: {
              original: item,
              index,
              getIsSelected: () => selectedKeys.has(resolveIdKey(item)),
              toggleSelected: (isSelected?: boolean) => {
                const next = new Set(selectedKeys)
                const id = resolveIdKey(item)
                if (isSelected ?? !next.has(id)) {
                  next.add(id)
                } else {
                  next.delete(id)
                }
                setSelectedKeys(next)
              },
            },
            column: { id: key },
            table: table ?? {},
          })
        }
      }

      return {
        key,
        header,
        renderCell,
        align: col.align,
        width: col.width,
      }
    },
  )

  return (
    <AstryxTable
      data={data}
      columns={columns}
      idKey={resolveIdKey}
      density="balanced"
      dividers="rows"
      plugins={
        hasSelectCol || externalSelectedKeys
          ? { selection: selectionPlugin }
          : undefined
      }
    />
  )
}
