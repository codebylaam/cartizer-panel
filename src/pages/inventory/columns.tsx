import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import type { ColumnDef } from '@tanstack/react-table'

import type { InventoryT } from '@/schemas/inventory'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

const columnHelper = createColumnHelper<InventoryT>()

function generateInventoryListColumns(
  t: TFunction,
): Array<ColumnDef<InventoryT, any>> {
  return [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          indeterminate={table.getIsSomeRowsSelected()}
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(boolean) =>
            table.getToggleAllRowsSelectedHandler()({
              target: { checked: boolean },
            })
          }
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(boolean) => row.toggleSelected(boolean)}
        />
      ),
    }),
    columnHelper.accessor('name', {
      header: t('page.inventory.table.header.name', 'Product Name'),
      cell: (info) => (
        <Link
          className="underline font-medium"
          to={'/products/$id'}
          params={{ id: info.row.original.id }}
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('sku', {
      header: t('page.inventory.table.header.sku', 'SKU'),
      cell: (info) => info.getValue() || '-',
    }),
    columnHelper.accessor('price', {
      header: t('page.inventory.table.header.price', 'Price'),
      cell: (info) => {
        const val = Number(info.getValue()) || 0
        return `৳${val.toFixed(2)}`
      },
    }),
    columnHelper.accessor('stock_quantity', {
      header: t('page.inventory.table.header.stock_quantity', 'Stock Quantity'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'status',
      header: t('page.inventory.table.header.status', 'Stock Status'),
      cell: ({ row }) => {
        const qty = row.original.stock_quantity
        if (qty === 0) {
          return (
            <Badge variant="destructive">
              {t('page.inventory.status.out_of_stock', 'Out of Stock')}
            </Badge>
          )
        }
        if (qty < 5) {
          return (
            <Badge variant="outline">
              {t('page.inventory.status.low_stock', 'Low Stock')}
            </Badge>
          )
        }
        return (
          <Badge variant="default">
            {t('page.inventory.status.in_stock', 'In Stock')}
          </Badge>
        )
      },
    }),
  ]
}

export default generateInventoryListColumns
