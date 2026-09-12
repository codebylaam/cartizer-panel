import { useToast } from "@astryxdesign/core"
import { useTranslation } from "react-i18next"
import { VStack } from "@astryxdesign/core/VStack"
import { useNavigate } from "@tanstack/react-router"
import { Grid, GridSpan } from "@astryxdesign/core/Grid"

import Module from "@/components/module/module"
import OrderItems from "./components/order-items"
import OrderStatus from "./components/order-status"
import { useReactMutation } from "@/hooks/use-query"
import OrderSummary from "./components/order-summary"
import { createOrderFormOpt } from "./create-order-opt"
import PaymentDetails from "./components/payment-details"
import CustomerDetails from "./components/customer-details"
import { ORDER_STATUS, createOrderDefaultValue } from "./constant"
import { useAppForm } from "@/components/generic-inputs/field-context"
import type { CreateOrderT, OrderT } from "@/schemas/order"
import type { ProductT } from "@/schemas/product"

type OrderFormPageProps = {
  products: Array<ProductT>
  order?: OrderT | null
}

// Maps a persisted order onto the form's `update` shape. Numeric columns come
// back from Postgres as strings, so they are coerced here.
function toFormValues(order: OrderT & { id: string }): CreateOrderT {
  return {
    mode: "update",
    id: order.id,
    customer_name: order.customer_name,
    customer_phone: order.customer_phone,
    customer_email: order.customer_email ?? "",
    status: order.status ?? ORDER_STATUS.PENDING,
    payment_status: order.payment_status,
    payment_method: order.payment_method,
    delivery_charge: Number(order.delivery_charge) || 0,
    discount: Number(order.discount) || 0,
    notes: order.notes ?? "",
    items: order.items.map((item) => ({
      product_id: item.product_id ?? undefined,
      product_name: item.product_name,
      sku: item.sku ?? "",
      unit_price: Number(item.unit_price) || 0,
      quantity: Number(item.quantity) || 1,
      variants: item.variants ?? undefined,
    })),
  }
}

export default function OrderFormPage({ products, order }: OrderFormPageProps) {
  const toast = useToast()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const existingOrder = order?.id ? (order as OrderT & { id: string }) : undefined
  const isUpdate = Boolean(existingOrder)

  const createOrderMutation = useReactMutation({
    url: "/order/create",
    method: "POST",
  })
  const updateOrderMutation = useReactMutation({
    url: `/order/update/${existingOrder?.id ?? ""}`,
    method: "PUT",
  })

  const form = useAppForm({
    ...createOrderFormOpt,
    defaultValues: existingOrder
      ? toFormValues(existingOrder)
      : createOrderDefaultValue,
    onSubmit: ({ value }) => {
      // `customer_email` is optional on the API but the field is always a
      // string in the form, so an empty value must be omitted rather than sent.
      const payload = {
        ...value,
        customer_email: value.customer_email || undefined,
      }

      const onSuccess = (response: { message: string }) => {
        toast({ body: t(response.message) })
        if (existingOrder) {
          navigate({
            to: "/orders/$id",
            params: { id: existingOrder.id },
          })
        } else {
          navigate({ to: "/orders" })
        }
      }
      const onError = (error: Error) => {
        toast({ body: t(error.message), type: "error" })
      }

      if (existingOrder) {
        updateOrderMutation.mutate(payload, { onSuccess, onError })
      } else {
        createOrderMutation.mutate(payload, { onSuccess, onError })
      }
    },
  })

  return (
    <Module>
      <Module.Header>
        <Module.Title>
          {isUpdate
            ? t("create.order.update_heading", "Update Order")
            : t("create.order.heading", "Create Order")}
        </Module.Title>
      </Module.Header>
      <Module.Content>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <Grid columns={12} gap={4} align="start">
            <GridSpan columns={8}>
              <VStack gap={4}>
                <CustomerDetails form={form} />
                <OrderItems form={form} products={products} />
              </VStack>
            </GridSpan>

            <GridSpan columns={4}>
              <VStack gap={4}>
                <PaymentDetails form={form} />
                <OrderStatus form={form} />
                <OrderSummary form={form} />
              </VStack>
            </GridSpan>
          </Grid>
        </form>
      </Module.Content>
    </Module>
  )
}
