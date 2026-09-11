import { Link } from "@tanstack/react-router"
import { pixel, proportional } from "@astryxdesign/core/Table"
import { Text } from "@astryxdesign/core/Text"
import { Token } from "@astryxdesign/core/Token"
import type { TableColumn } from "@astryxdesign/core/Table"
import type { TokenColor } from "@astryxdesign/core/Token"
import type { TFunction } from "i18next"

import type { InventoryT } from "@/schemas/inventory"

const LOW_STOCK_THRESHOLD = 5

function getStockStatus(stockQuantity: number) {
  if (stockQuantity <= 0) {
    return { key: "out_of_stock", color: "red" as TokenColor }
  }
  if (stockQuantity < LOW_STOCK_THRESHOLD) {
    return { key: "low_stock", color: "yellow" as TokenColor }
  }
  return { key: "in_stock", color: "green" as TokenColor }
}

function generateInventoryListColumns(
  t: TFunction,
): Array<TableColumn<InventoryT>> {
  return [
    {
      key: "name",
      header: t("page.inventory.table.header.name"),
      width: proportional(2),
      sortable: { sortKey: "title" },
      renderCell: (item) => (
        <Link to="/products/$id" params={{ id: item.id }}>
          <Text color="accent">{item.name}</Text>
        </Link>
      ),
    },
    {
      key: "sku",
      header: t("page.inventory.table.header.sku"),
      width: pixel(140),
      renderCell: (item) => item.sku || "-",
    },
    {
      key: "price",
      header: t("page.inventory.table.header.price"),
      width: proportional(1),
      align: "end",
      sortable: true,
      renderCell: (item) =>
        t("{{value, currency(BDT)}}", { value: Number(item.price) || 0 }),
    },
    {
      key: "stock_quantity",
      header: t("page.inventory.table.header.stock_quantity"),
      width: pixel(150),
      align: "end",
      renderCell: (item) => t("{{value, number}}", { value: item.stock_quantity }),
    },
    {
      key: "status",
      header: t("page.inventory.table.header.status"),
      width: pixel(140),
      renderCell: (item) => {
        const status = getStockStatus(item.stock_quantity)
        return (
          <Token
            size="sm"
            color={status.color}
            label={t(`page.inventory.status.${status.key}`)}
          />
        )
      },
    },
  ]
}

export default generateInventoryListColumns
