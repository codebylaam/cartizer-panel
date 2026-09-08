import { Link } from '@tanstack/react-router'
import { createColumnHelper } from '@tanstack/react-table'

import type { TFunction } from 'i18next'

import type { CategoryT } from '@/schemas/category'
import { Checkbox } from '@/components/ui/checkbox'

const columnHelper = createColumnHelper<CategoryT>()

function generateCategoryListColumns(t: TFunction) {
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
        <button type="button" className="flex gap-1 items-center">
          <span>{t('page.category.table.header.name')}</span>
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
    columnHelper.accessor('description', {
      header: t('page.category.table.header.description'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('slug', {
      header: t('page.category.table.header.slug'),
      cell: (info) => `/${info.getValue()}`,
    }),

    columnHelper.accessor('created_at', {
      header: t('page.category.table.header.created_at'),
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

export default generateCategoryListColumns
