import { createColumnHelper } from '@tanstack/react-table'

import type { TFunction } from 'i18next'

import type { MediaT } from '@/schemas/media'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const columnHelper = createColumnHelper<MediaT>()

function generateMediaListColumns(t: TFunction) {
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
    columnHelper.accessor('url', {
      header: () => (
        <button type="button" className="flex gap-1 items-center">
          <span>{t('page.media.table.header.media')}</span>
        </button>
      ),
      cell: (info) => (
        <Tooltip>
          <TooltipTrigger delay={100}>
            <img
              src={info.getValue()}
              alt={info.row.original.name}
              className="w-8 h-8 aspect-square object-cover"
            ></img>
          </TooltipTrigger>
          <TooltipContent className={'p-1'}>
            <img
              src={info.getValue()}
              alt={info.row.original.name}
              className="w-32 h-32 aspect-square object-cover"
            ></img>
          </TooltipContent>
        </Tooltip>
      ),
    }),
    columnHelper.accessor('name', {
      header: () => (
        <button type="button" className="flex gap-1 items-center">
          <span>{t('page.media.table.header.name')}</span>
        </button>
      ),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('size', {
      header: t('page.media.table.header.size'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('mime_type', {
      header: t('page.media.table.header.mime_type'),
      cell: (info) => info.getValue(),
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

export default generateMediaListColumns
