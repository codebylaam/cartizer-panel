import { Link } from "@tanstack/react-router"
import { pixel, proportional } from "@astryxdesign/core/Table"
import { Text } from "@astryxdesign/core/Text"
import type { TableColumn } from "@astryxdesign/core/Table"
import type { TFunction } from "i18next"

import type { ProductT } from "@/schemas/product"

function generateProductListColumns(
  t: TFunction,
): Array<TableColumn<ProductT>> {
  return [
    {
      key: "name",
      header: t("page.product.table.header.title"),
      width: proportional(2),
      sortable: { sortKey: "title" },
      renderCell: (product) => (
        <Link to="/products/$id" params={{ id: product.id }}>
          <Text color="accent">{product.name}</Text>
        </Link>
      ),
    },
    {
      key: "price",
      header: t("page.product.table.header.price"),
      width: proportional(1),
      align: "end",
      sortable: true,
      renderCell: (product) =>
        t("{{value, currency(BDT)}}", { value: product.price }),
    },
    {
      key: "serial",
      header: t("page.product.table.header.serial"),
      width: pixel(140),
      renderCell: (product) => product.serial,
    },
    {
      key: "stock_quantity",
      header: t("page.product.table.header.stock_quantity"),
      width: pixel(150),
      align: "end",
      renderCell: (product) =>
        t("{{value, number}}", { value: product.stock_quantity }),
    },
    {
      key: "sku",
      header: t("page.product.table.header.sku"),
      width: pixel(140),
      renderCell: (product) => product.sku,
    },
    {
      key: "created_at",
      header: t("page.product.table.header.created_at"),
      width: pixel(160),
      sortable: true,
      renderCell: (product) =>
        t("{{value, datetime}}", {
          value: new Date(product.created_at),
          formatParams: {
            value: {
              year: "numeric",
              month: "short",
              day: "numeric",
            },
          },
        }),
    },
  ]
}

export default generateProductListColumns
