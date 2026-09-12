import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'

import { createOrderFormOpt } from '../create-order-opt'
import { withForm } from '@/components/generic-inputs/field-context'

const CustomerDetails = withForm({
  ...createOrderFormOpt,
  render: function ({ form }) {
    const { t } = useTranslation()

    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">{t('create.order.form.customer')}</Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout>
                <FormLayout direction="horizontal">
                  <form.AppField name="customer_name">
                    {(field) => (
                      <field.GenericInput
                        isRequired
                        label={t('create.order.form.customer_name.label')}
                        placeholder={t(
                          'create.order.form.customer_name.placeholder',
                        )}
                        description={t(
                          'create.order.form.customer_name.description',
                        )}
                      />
                    )}
                  </form.AppField>

                  <form.AppField name="customer_phone">
                    {(field) => (
                      <field.GenericInput
                        isRequired
                        label={t('create.order.form.customer_phone.label')}
                        placeholder={t(
                          'create.order.form.customer_phone.placeholder',
                        )}
                        description={t(
                          'create.order.form.customer_phone.description',
                        )}
                      />
                    )}
                  </form.AppField>
                </FormLayout>

                <form.AppField name="customer_email">
                  {(field) => (
                    <field.GenericInput
                      label={t('create.order.form.customer_email.label')}
                      placeholder={t(
                        'create.order.form.customer_email.placeholder',
                      )}
                      description={t(
                        'create.order.form.customer_email.description',
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

export default CustomerDetails
