import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'

import { createOrderFormOpt } from '../create-order-opt'
import { getPaymentMethodOptions, getPaymentStatusOptions } from '../constant'
import { withForm } from '@/components/generic-inputs/field-context'

const PaymentDetails = withForm({
  ...createOrderFormOpt,
  render: function ({ form }) {
    const { t } = useTranslation()

    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">
                {t('create.order.form.payment', 'Payment & Delivery')}
              </Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout>
                <form.AppField name="payment_status">
                  {(field) => (
                    <field.GenericSelect
                      label={t(
                        'create.order.form.payment_status.label',
                        'Payment Status',
                      )}
                      options={getPaymentStatusOptions(t)}
                      description={t(
                        'create.order.form.payment_status.description',
                        'Select current payment status',
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="payment_method">
                  {(field) => (
                    <field.GenericSelect
                      label={t(
                        'create.order.form.payment_method.label',
                        'Payment Method',
                      )}
                      options={getPaymentMethodOptions(t)}
                      description={t(
                        'create.order.form.payment_method.description',
                        'Select method of payment',
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="delivery_charge">
                  {(field) => (
                    <field.GenericInput
                      label={t(
                        'create.order.form.delivery_charge.label',
                        'Delivery Charge (BDT)',
                      )}
                      description={t(
                        'create.order.form.delivery_charge.description',
                        'Delivery fee amount',
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="discount">
                  {(field) => (
                    <field.GenericInput
                      label={t(
                        'create.order.form.discount.label',
                        'Discount (BDT)',
                      )}
                      description={t(
                        'create.order.form.discount.description',
                        'Discount amount to apply',
                      )}
                    />
                  )}
                </form.AppField>
              </FormLayout>
            </LayoutContent>
          }
        />
      </Card>
    )
  },
})

export default PaymentDetails
