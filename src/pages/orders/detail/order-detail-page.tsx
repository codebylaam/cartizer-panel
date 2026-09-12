import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "@tanstack/react-router"
import { Card } from "@astryxdesign/core/Card"
import { Grid, GridSpan } from "@astryxdesign/core/Grid"
import { HStack } from "@astryxdesign/core/HStack"
import { VStack } from "@astryxdesign/core/VStack"
import { Button } from "@astryxdesign/core/Button"
import { Divider } from "@astryxdesign/core/Divider"
import { Text } from "@astryxdesign/core/Text"
import { Token } from "@astryxdesign/core/Token"
import { Layout, LayoutContent, LayoutHeader } from "@astryxdesign/core/Layout"
import type { TokenColor } from "@astryxdesign/core/Token"
import type { ReactNode } from "react"

import Module from "@/components/module/module"
import { Route } from "@/routes/_authenticated/orders/$id/index"
import {
  getOrderStatusOptions,
  getPaymentMethodOptions,
  getPaymentStatusOptions,
} from "@/pages/orders/create-order/constant"

const ORDER_STATUS_COLOR: Record<string, TokenColor> = {
  PENDING: "yellow",
  PROCESSING: "blue",
  SHIPPED: "cyan",
  DELIVERED: "green",
  CANCELLED: "red",
  REFUNDED: "gray",
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <HStack justify="between" align="center" gap={3}>
      <Text color="secondary">{label}</Text>
      {typeof value === "string" || typeof value === "number" ? (
        <Text weight="semibold">{value}</Text>
      ) : (
        value
      )}
    </HStack>
  )
}

export default function OrderDetailPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { order } = Route.useLoaderData()

  const statusLabels = useMemo(
    () =>
      new Map<string, string>(
        getOrderStatusOptions(t).map((o) => [o.value, o.label]),
      ),
    [t],
  )
  const paymentStatusLabels = useMemo(
    () =>
      new Map<string, string>(
        getPaymentStatusOptions(t).map((o) => [o.value, o.label]),
      ),
    [t],
  )
  const paymentMethodLabels = useMemo(
    () =>
      new Map<string, string>(
        getPaymentMethodOptions(t).map((o) => [o.value, o.label]),
      ),
    [t],
  )

  const currency = (value: unknown) =>
    t("{{value, currency(BDT)}}", { value: Number(value) || 0 })

  const address = order.shipping_address
  const addressLines = address
    ? [
        address.address_1,
        address.address_2,
        address.city,
        address.state,
        address.postal_code,
        address.country,
      ].filter(Boolean)
    : []

  return (
    <Module>
      <Module.Header>
        <HStack gap={3} align="center">
          <Button
            label={t("page.order.detail.back")}
            variant="secondary"
            onClick={() => navigate({ to: "/orders" })}
          />
          <Module.Title>
            {order.order_number ?? t("page.order.detail.title")}
          </Module.Title>
        </HStack>
        {order.id ? (
          <Button
            label={t("page.order.detail.edit")}
            variant="primary"
            onClick={() =>
              navigate({
                to: "/orders/$id/edit",
                params: { id: order.id as string },
              })
            }
          />
        ) : null}
      </Module.Header>
      <Module.Content>
        <Grid columns={12} gap={4}>
          <GridSpan columns={8}>
            <VStack gap={4}>
              <Card>
                <Layout
                  header={
                    <LayoutHeader>
                      <Text type="large">
                        {t("page.order.detail.customer.heading")}
                      </Text>
                    </LayoutHeader>
                  }
                  content={
                    <LayoutContent>
                      <VStack gap={3}>
                        <DetailRow
                          label={t("page.order.detail.customer.name")}
                          value={order.customer_name}
                        />
                        <DetailRow
                          label={t("page.order.detail.customer.phone")}
                          value={order.customer_phone}
                        />
                        <DetailRow
                          label={t("page.order.detail.customer.email")}
                          value={order.customer_email ?? "-"}
                        />
                      </VStack>
                    </LayoutContent>
                  }
                />
              </Card>

              <Card>
                <Layout
                  header={
                    <LayoutHeader>
                      <Text type="large">
                        {t("page.order.detail.items.heading")}
                      </Text>
                    </LayoutHeader>
                  }
                  content={
                    <LayoutContent>
                      <VStack gap={3}>
                        {order.items.map((item, index) => (
                          <VStack key={index} gap={2}>
                            <HStack justify="between" align="start" gap={3}>
                              <VStack gap={0.5}>
                                <Text weight="semibold">
                                  {item.product_name}
                                </Text>
                                {item.sku ? (
                                  <Text type="supporting" color="secondary">
                                    {t("page.order.detail.items.sku")}:{" "}
                                    {item.sku}
                                  </Text>
                                ) : null}
                                {item.variants?.length ? (
                                  <Text type="supporting" color="secondary">
                                    {item.variants
                                      .map((variant) => variant.attribute)
                                      .join(", ")}
                                  </Text>
                                ) : null}
                              </VStack>
                              <HStack gap={4} align="center">
                                <Text color="secondary">
                                  {t("page.order.detail.items.quantity")}{" "}
                                  {item.quantity}
                                </Text>
                                <Text weight="semibold">
                                  {currency(
                                    Number(item.unit_price) * item.quantity,
                                  )}
                                </Text>
                              </HStack>
                            </HStack>
                            {index < order.items.length - 1 ? (
                              <Divider />
                            ) : null}
                          </VStack>
                        ))}
                      </VStack>
                    </LayoutContent>
                  }
                />
              </Card>

              {addressLines.length > 0 ? (
                <Card>
                  <Layout
                    header={
                      <LayoutHeader>
                        <Text type="large">
                          {t("page.order.detail.shipping.heading")}
                        </Text>
                      </LayoutHeader>
                    }
                    content={
                      <LayoutContent>
                        <Text>{addressLines.join(", ")}</Text>
                      </LayoutContent>
                    }
                  />
                </Card>
              ) : null}
            </VStack>
          </GridSpan>

          <GridSpan columns={4}>
            <VStack gap={4}>
              <Card>
                <Layout
                  header={
                    <LayoutHeader>
                      <Text type="large">
                        {t("page.order.detail.payment.heading")}
                      </Text>
                    </LayoutHeader>
                  }
                  content={
                    <LayoutContent>
                      <VStack gap={3}>
                        <DetailRow
                          label={t("page.order.detail.payment.order_status")}
                          value={
                            <Token
                              size="sm"
                              color={
                                ORDER_STATUS_COLOR[order.status ?? ""] ??
                                "default"
                              }
                              label={
                                statusLabels.get(order.status ?? "") ??
                                order.status ??
                                "-"
                              }
                            />
                          }
                        />
                        <DetailRow
                          label={t("page.order.detail.payment.status")}
                          value={
                            <Token
                              size="sm"
                              color="default"
                              label={
                                paymentStatusLabels.get(
                                  order.payment_status,
                                ) ?? order.payment_status
                              }
                            />
                          }
                        />
                        <DetailRow
                          label={t("page.order.detail.payment.method")}
                          value={
                            paymentMethodLabels.get(order.payment_method) ??
                            order.payment_method
                          }
                        />
                        <DetailRow
                          label={t("page.order.detail.payment.placed_at")}
                          value={
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
                              : "-"
                          }
                        />
                      </VStack>
                    </LayoutContent>
                  }
                />
              </Card>

              <Card>
                <Layout
                  header={
                    <LayoutHeader>
                      <Text type="large">
                        {t("page.order.detail.summary.heading")}
                      </Text>
                    </LayoutHeader>
                  }
                  content={
                    <LayoutContent>
                      <VStack gap={3}>
                        <DetailRow
                          label={t("page.order.detail.summary.subtotal")}
                          value={currency(order.subtotal)}
                        />
                        <DetailRow
                          label={t("page.order.detail.summary.discount")}
                          value={`-${currency(order.discount)}`}
                        />
                        <DetailRow
                          label={t("page.order.detail.summary.delivery_charge")}
                          value={`+${currency(order.delivery_charge)}`}
                        />
                        <Divider />
                        <HStack justify="between" align="center" gap={3}>
                          <Text weight="semibold">
                            {t("page.order.detail.summary.total")}
                          </Text>
                          <Text type="large" color="accent" weight="bold">
                            {currency(order.total)}
                          </Text>
                        </HStack>
                      </VStack>
                    </LayoutContent>
                  }
                />
              </Card>

              {order.notes ? (
                <Card>
                  <Layout
                    header={
                      <LayoutHeader>
                        <Text type="large">
                          {t("page.order.detail.notes.heading")}
                        </Text>
                      </LayoutHeader>
                    }
                    content={
                      <LayoutContent>
                        <Text>{order.notes}</Text>
                      </LayoutContent>
                    }
                  />
                </Card>
              ) : null}
            </VStack>
          </GridSpan>
        </Grid>
      </Module.Content>
    </Module>
  )
}
