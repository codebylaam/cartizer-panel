import { Link } from '@tanstack/react-router'
// import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react/dist/ssr'
import { createColumnHelper } from '@tanstack/react-table'
import type { TFunction } from 'i18next'

import type { ProductT } from '@/schemas/product'
import { Checkbox } from '@/components/ui/checkbox'

const columnHelper = createColumnHelper<ProductT>()

function generateProductListColumns(t: TFunction) {
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
      header: () => (
        <button
          type="button"
          className="flex gap-1 items-center"
          // onClick={() =>
          //   navigate({
          //     search: {
          //       sort_order: sort_order === 'asc' ? 'desc' : 'asc',
          //       sort_by: 'title',
          //     },
          //   })
          // }
        >
          <span>{t('page.product.table.header.title')}</span>
        </button>
      ),
      cell: (info) => (
        <Link
          className="underline"
          to={'/products/$id'}
          params={{ id: info.row.original.id }}
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.display({
      id: 'price',
      header: () => (
        <button
          type="button"
          className="flex gap-1 items-center"
          // onClick={() =>
          //   navigate({
          //     search: {
          //       sort_order: sort_order === 'asc' ? 'desc' : 'asc',
          //       sort_by: 'price',
          //     },
          //   })
          // }
        >
          <span>{t('page.product.table.header.price')}</span>
        </button>
      ),
      cell: (info) =>
        t('{{value, currency(BDT)}}', { value: info.row.original.price }),
    }),
    columnHelper.accessor('serial', {
      header: t('page.product.table.header.serial'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('stock_quantity', {
      header: t('page.product.table.header.stock_quantity'),
      cell: (info) => t('{{value, number}}', { value: info.getValue() }),
    }),
    columnHelper.accessor('sku', {
      header: t('page.product.table.header.sku'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('created_at', {
      header: t('page.product.table.header.created_at'),
      cell: (info) =>
        t('{{value, datetime}}', {
          value: new Date(info.getValue()),
          formatParams: {
            value: {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            },
          },
        }),
    }),
  ]
}

export default generateProductListColumns
