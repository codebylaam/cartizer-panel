import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { TFunction } from 'i18next'

import type { CustomerT } from '@/schemas/customer'
import { Checkbox } from '@/components/ui/checkbox'

const columnHelper = createColumnHelper<CustomerT>()

function generateCustomerListColumns(
  t: TFunction,
): Array<ColumnDef<CustomerT, any>> {
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
      header: t('page.customer.table.header.name', 'Customer Name'),
      cell: (info) => (
        <Link className="underline font-medium" to={'/customers'}>
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('email', {
      header: t('page.customer.table.header.email', 'Email'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('phone', {
      header: t('page.customer.table.header.phone', 'Phone'),
      cell: (info) => info.getValue() || '-',
    }),
    columnHelper.accessor('created_at', {
      header: t('page.customer.table.header.created_at', 'Created At'),
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

export default generateCustomerListColumns
