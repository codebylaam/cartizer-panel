import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { TFunction } from 'i18next'

import type { OrderT } from '@/schemas/order'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

const columnHelper = createColumnHelper<OrderT>()

function generateOrderListColumns(t: TFunction): Array<ColumnDef<OrderT, any>> {
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
    columnHelper.accessor('customer_name', {
      header: t('page.order.table.header.customer_name', 'Customer Name'),
      cell: (info) => (
        <Link className="underline font-medium" to={'/orders'}>
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('customer_phone', {
      header: t('page.order.table.header.customer_phone', 'Customer Phone'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('payment_status', {
      header: t('page.order.table.header.payment_status', 'Payment Status'),
      cell: (info) => {
        const status = info.getValue()
        const variantMap: Record<
          string,
          'default' | 'secondary' | 'destructive' | 'outline'
        > = {
          PAID: 'default',
          UNPAID: 'destructive',
          PENDING: 'outline',
          PARTIAL: 'secondary',
          REFUNDED: 'destructive',
        }

        return <Badge variant={variantMap[status] || 'outline'}>{status}</Badge>
      },
    }),
    columnHelper.accessor('payment_method', {
      header: t('page.order.table.header.payment_method', 'Payment Method'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('delivery_charge', {
      header: t('page.order.table.header.delivery_charge', 'Delivery Charge'),
      cell: (info) => `৳${Number(info.getValue() || 0).toFixed(2)}`,
    }),
    columnHelper.accessor('discount', {
      header: t('page.order.table.header.discount', 'Discount'),
      cell: (info) => `৳${Number(info.getValue() || 0).toFixed(2)}`,
    }),
    columnHelper.display({
      id: 'items_count',
      header: t('page.order.table.header.items_count', 'Items'),
      cell: (info) => info.row.original.items.length || 0,
    }),
    columnHelper.accessor('created_at', {
      header: t('page.order.table.header.created_at', 'Created At'),
      cell: (info) => {
        const val = info.getValue()
        if (!val) return '-'
        return t('{{value, datetime}}', {
          value: new Date(val),
          formatParams: {
            value: {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            },
          },
        })
      },
    }),
  ]
}

export default generateOrderListColumns
