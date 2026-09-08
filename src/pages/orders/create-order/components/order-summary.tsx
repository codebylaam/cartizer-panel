import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { Button } from '@astryxdesign/core/Button'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Divider } from '@astryxdesign/core/Divider'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'

import { createOrderFormOpt } from '../create-order-opt'
import { withForm } from '@/components/generic-inputs/field-context'

const OrderSummary = withForm({
  ...createOrderFormOpt,
  render: function ({ form }) {
    const { t } = useTranslation()

    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">
                {t('create.order.form.summary.heading', 'Order Summary')}
              </Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <VStack gap={3}>
                <form.Subscribe
                  selector={(state) => ({
                    items: state.values.items,
                    discount: Number(state.values.discount) || 0,
                    deliveryCharge: Number(state.values.delivery_charge) || 0,
                  })}
                >
                  {({ items, discount, deliveryCharge }) => {
                    const subtotal = items.reduce((acc, item) => {
                      const price = Number(item.unit_price) || 0
                      const qty = Number(item.quantity) || 0
                      return acc + price * qty
                    }, 0)

                    const grandTotal = Math.max(
                      0,
                      subtotal - discount + deliveryCharge,
                    )

                    return (
                      <VStack gap={2}>
                        <HStack justify="between">
                          <Text color="secondary">
                            {t(
                              'create.order.form.summary.subtotal',
                              'Subtotal',
                            )}
                            :
                          </Text>
                          <Text weight="bold">৳{subtotal.toFixed(2)}</Text>
                        </HStack>

                        <HStack justify="between">
                          <Text color="secondary">
                            {t(
                              'create.order.form.summary.discount',
                              'Discount',
                            )}
                            :
                          </Text>
                          <Text weight="bold">-৳{discount.toFixed(2)}</Text>
                        </HStack>

                        <HStack justify="between">
                          <Text color="secondary">
                            {t(
                              'create.order.form.summary.delivery_charge',
                              'Delivery Charge',
                            )}
                            :
                          </Text>
                          <Text weight="bold">
                            +৳{deliveryCharge.toFixed(2)}
                          </Text>
                        </HStack>

                        <Divider />

                        <HStack justify="between">
                          <Text type="large" weight="bold">
                            {t(
                              'create.order.form.summary.total',
                              'Grand Total',
                            )}
                            :
                          </Text>
                          <Text type="large" color="accent" weight="bold">
                            ৳{grandTotal.toFixed(2)}
                          </Text>
                        </HStack>
                      </VStack>
                    )
                  }}
                </form.Subscribe>

                <form.Subscribe>
                  {({ isValid, isSubmitting }) => (
                    <Button
                      label={t('create.order.submit', 'Create Order')}
                      type="submit"
                      isLoading={isSubmitting}
                      isDisabled={!isValid}
                      variant="primary"
                      width="100%"
                    >
                      {t('create.order.submit', 'Create Order')}
                    </Button>
                  )}
                </form.Subscribe>
              </VStack>
            </LayoutContent>
          }
        />
      </Card>
    )
  },
})

export default OrderSummary
