import { pixel, proportional } from "@astryxdesign/core/Table"
import type { TableColumn } from "@astryxdesign/core/Table"
import type { TFunction } from "i18next"

import type { CategoryT } from "@/schemas/category"

function generateCategoryListColumns(
  t: TFunction,
): Array<TableColumn<CategoryT>> {
  return [
    {
      key: "name",
      header: t("page.category.table.header.name"),
      width: proportional(2),
      renderCell: (category) => category.name,
    },
    {
      key: "description",
      header: t("page.category.table.header.description"),
      width: proportional(3),
      renderCell: (category) => category.description,
    },
    {
      key: "slug",
      header: t("page.category.table.header.slug"),
      width: pixel(180),
      renderCell: (category) => `/${category.slug}`,
    },
    {
      key: "created_at",
      header: t("page.category.table.header.created_at"),
      width: pixel(160),
      sortable: true,
      renderCell: (category) =>
        category.created_at
          ? t("{{value, datetime}}", {
              value: new Date(category.created_at),
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

export default generateCategoryListColumns
