import { pixel, proportional } from "@astryxdesign/core/Table"
import { Thumbnail } from "@astryxdesign/core/Thumbnail"
import type { TableColumn } from "@astryxdesign/core/Table"
import type { TFunction } from "i18next"

import type { MediaT } from "@/schemas/media"

function generateMediaListColumns(t: TFunction): Array<TableColumn<MediaT>> {
  return [
    {
      key: "url",
      header: t("page.media.table.header.media"),
      width: pixel(88),
      renderCell: (media) => (
        <Thumbnail src={media.url} alt={media.name} label={media.name} />
      ),
    },
    {
      key: "name",
      header: t("page.media.table.header.name"),
      width: proportional(2),
      renderCell: (media) => media.name,
    },
    {
      key: "size",
      header: t("page.media.table.header.size"),
      width: pixel(120),
      align: "end",
      renderCell: (media) => media.size,
    },
    {
      key: "mime_type",
      header: t("page.media.table.header.mime_type"),
      width: pixel(140),
      renderCell: (media) => media.mime_type,
    },
    {
      key: "created_at",
      header: t("page.media.table.header.created_at"),
      width: pixel(160),
      sortable: true,
      renderCell: (media) =>
        media.created_at
          ? t("{{value, datetime}}", {
              value: new Date(media.created_at),
              formatParams: {
                value: {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              },
            })
          : "-",
    },
  ]
}

export default generateMediaListColumns
