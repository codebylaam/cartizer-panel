import { pixel, proportional } from "@astryxdesign/core/Table"
import { Token } from "@astryxdesign/core/Token"
import type { TableColumn } from "@astryxdesign/core/Table"
import type { TokenColor } from "@astryxdesign/core/Token"
import type { TFunction } from "i18next"

import {
  PAYMENT_STATUS,
  getPaymentMethodOptions,
  getPaymentStatusOptions,
} from "@/pages/orders/create-order/constant"
import type { OrderT } from "@/schemas/order"

const PAYMENT_STATUS_COLOR: Record<string, TokenColor> = {
  [PAYMENT_STATUS.PAID]: "green",
  [PAYMENT_STATUS.UNPAID]: "red",
  [PAYMENT_STATUS.PENDING]: "yellow",
  [PAYMENT_STATUS.PARTIAL]: "blue",
  [PAYMENT_STATUS.REFUNDED]: "gray",
}

function generateOrderListColumns(t: TFunction): Array<TableColumn<OrderT>> {
  const paymentStatusLabels = new Map(
    getPaymentStatusOptions(t).map((option) => [option.value, option.label]),
  )
  const paymentMethodLabels = new Map(
    getPaymentMethodOptions(t).map((option) => [option.value, option.label]),
  )

  return [
    {
      key: "customer_name",
      header: t("page.order.table.header.customer_name"),
      width: proportional(2),
      renderCell: (order) => order.customer_name,
    },
    {
      key: "customer_phone",
      header: t("page.order.table.header.customer_phone"),
      width: pixel(160),
      renderCell: (order) => order.customer_phone,
    },
    {
      key: "payment_status",
      header: t("page.order.table.header.payment_status"),
      width: pixel(140),
      renderCell: (order) => (
        <Token
          size="sm"
          color={PAYMENT_STATUS_COLOR[order.payment_status] ?? "default"}
          label={
            paymentStatusLabels.get(order.payment_status) ??
            order.payment_status
          }
        />
      ),
    },
    {
      key: "payment_method",
      header: t("page.order.table.header.payment_method"),
      width: proportional(1),
      renderCell: (order) =>
        paymentMethodLabels.get(order.payment_method) ?? order.payment_method,
    },
    {
      key: "delivery_charge",
      header: t("page.order.table.header.delivery_charge"),
      width: pixel(150),
      align: "end",
      renderCell: (order) =>
        t("{{value, currency(BDT)}}", { value: order.delivery_charge }),
    },
    {
      key: "discount",
      header: t("page.order.table.header.discount"),
      width: pixel(130),
      align: "end",
      renderCell: (order) => t("{{value, currency(BDT)}}", { value: order.discount }),
    },
    {
      key: "items",
      header: t("page.order.table.header.items_count"),
      width: pixel(100),
      align: "end",
      renderCell: (order) => t("{{value, number}}", { value: order.items.length }),
    },
    {
      key: "created_at",
      header: t("page.order.table.header.created_at"),
      width: pixel(160),
      sortable: true,
      renderCell: (order) =>
        order.created_at
          ? t("{{value, datetime}}", {
              value: new Date(order.created_at),
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

export default generateOrderListColumns
