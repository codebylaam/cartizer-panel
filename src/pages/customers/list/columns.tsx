import { pixel, proportional } from "@astryxdesign/core/Table"
import { HStack } from "@astryxdesign/core/HStack"
import { StatusDot } from "@astryxdesign/core/StatusDot"
import { Text } from "@astryxdesign/core/Text"
import { Token } from "@astryxdesign/core/Token"
import type { TableColumn } from "@astryxdesign/core/Table"
import type { TFunction } from "i18next"

import {
  CUSTOMER_ACCOUNT_STATUS,
  CUSTOMER_CREATED_BY,
  type CustomerT,
} from "@/schemas/customer"

function generateCustomerListColumns(
  t: TFunction,
): Array<TableColumn<CustomerT>> {
  return [
    {
      key: "name",
      header: t("page.customer.table.header.name"),
      width: proportional(2),
      sortable: true,
      renderCell: (customer) => customer.name,
    },
    {
      key: "email",
      header: t("page.customer.table.header.email"),
      width: proportional(2),
      sortable: true,
      renderCell: (customer) => customer.email,
    },
    {
      key: "phone",
      header: t("page.customer.table.header.phone"),
      width: pixel(150),
      renderCell: (customer) => customer.phone || "-",
    },
    {
      key: "account_status",
      header: t("page.customer.table.header.account_status"),
      width: pixel(140),
      renderCell: (customer) => {
        const isActive =
          customer.account_status === CUSTOMER_ACCOUNT_STATUS.ACTIVE
        return (
          <HStack gap={1.5} align="center">
            <StatusDot
              variant={isActive ? "success" : "warning"}
              label={t(`page.customer.status.${customer.account_status}`)}
            />
            <Text>{t(`page.customer.status.${customer.account_status}`)}</Text>
          </HStack>
        )
      },
    },
    {
      key: "created_by",
      header: t("page.customer.table.header.created_by"),
      width: pixel(130),
      renderCell: (customer) => (
        <Token
          size="sm"
          color={
            customer.created_by === CUSTOMER_CREATED_BY.SELLER ? "blue" : "gray"
          }
          label={t(`page.customer.created_by.${customer.created_by}`)}
        />
      ),
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
