import { useToast } from "@astryxdesign/core"
import { useTranslation } from "react-i18next"
import { VStack } from "@astryxdesign/core/VStack"
import { useNavigate } from "@tanstack/react-router"
import { Grid, GridSpan } from "@astryxdesign/core/Grid"

import Module from "@/components/module/module"
import OrderItems from "./components/order-items"
import { useReactMutation } from "@/hooks/use-query"
import OrderSummary from "./components/order-summary"
import { createOrderFormOpt } from "./create-order-opt"
import PaymentDetails from "./components/payment-details"
import CustomerDetails from "./components/customer-details"
import { Route } from "@/routes/_authenticated/orders/create/index"
import { useAppForm } from "@/components/generic-inputs/field-context"

export default function CreateOrderPage() {
  const toast = useToast()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const productsResponse = Route.useLoaderData()
  const products = productsResponse.data
  const createOrderMutation = useReactMutation({
    url: "/order/create",
    method: "POST",
  })

  const form = useAppForm({
    ...createOrderFormOpt,
    onSubmit: ({ value }) => {
      createOrderMutation.mutate(value, {
        onSuccess: (response) => {
          toast({
            body: t(response.message),
          })
          navigate({ to: "/orders" })
        },
        onError: (error) => {
          toast({
            body: t(error.message),
            type: "error",
          })
        },
      })
    },
  })

  return (
    <Module>
      <Module.Header>
        <Module.Title>{t("create.order.heading")}</Module.Title>
      </Module.Header>
      <Module.Content>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <Grid columns={12} gap={4}>
            <GridSpan columns={8}>
              <VStack gap={4}>
                <CustomerDetails form={form} />
                <OrderItems form={form} products={products} />
              </VStack>
            </GridSpan>

            <GridSpan columns={4}>
              <VStack gap={4}>
                <PaymentDetails form={form} />
                <OrderSummary form={form} />
              </VStack>
            </GridSpan>
          </Grid>
        </form>
      </Module.Content>
    </Module>
  )
}
