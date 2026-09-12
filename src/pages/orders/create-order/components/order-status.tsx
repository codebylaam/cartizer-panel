import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'

import { createOrderFormOpt } from '../create-order-opt'
import { getOrderStatusOptions } from '../constant'
import { withForm } from '@/components/generic-inputs/field-context'

const OrderStatus = withForm({
  ...createOrderFormOpt,
  render: function OrderStatusCard({ form }) {
    const { t } = useTranslation()

    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">
                {t('create.order.form.status.heading', 'Order Status')}
              </Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout>
                <form.AppField name="status">
                  {(field) => (
                    <field.GenericSelect
                      label={t('create.order.form.status.label', 'Status')}
                      options={getOrderStatusOptions(t)}
                      description={t(
                        'create.order.form.status.description',
                        'Fulfillment status of the order',
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="notes">
                  {(field) => (
                    <field.GenericTextarea
                      label={t('create.order.form.notes.label', 'Notes')}
                      placeholder={t(
                        'create.order.form.notes.placeholder',
                        'Add a note about this order',
                      )}
                      description={t(
                        'create.order.form.notes.description',
                        'Internal notes, not shown to the customer',
                      )}
                      rows={3}
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

export default OrderStatus
