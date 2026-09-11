import { pixel, proportional } from "@astryxdesign/core/Table"
import type { TableColumn } from "@astryxdesign/core/Table"
import type { TFunction } from "i18next"

import type { CustomerT } from "@/schemas/customer"

function generateCustomerListColumns(
  t: TFunction,
): Array<TableColumn<CustomerT>> {
  return [
    {
      key: "name",
      header: t("page.customer.table.header.name"),
      width: proportional(2),
      renderCell: (customer) => customer.name,
    },
    {
      key: "email",
      header: t("page.customer.table.header.email"),
      width: proportional(2),
      renderCell: (customer) => customer.email,
    },
    {
      key: "phone",
      header: t("page.customer.table.header.phone"),
      width: pixel(160),
      renderCell: (customer) => customer.phone || "-",
    },
    {
      key: "created_at",
      header: t("page.customer.table.header.created_at"),
      width: pixel(160),
      sortable: true,
      renderCell: (customer) =>
        customer.created_at
          ? t("{{value, datetime}}", {
              value: new Date(customer.created_at),
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

export default generateCustomerListColumns
