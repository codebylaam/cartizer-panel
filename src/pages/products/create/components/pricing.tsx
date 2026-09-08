import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'

import { createProductFormOpt } from '../create-product-opt'
import { withForm } from '@/components/generic-inputs/field-context'

const Pricing = withForm({
  ...createProductFormOpt,
  render: function ({ form }) {
    const { t } = useTranslation()
    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">{t('create.product.form.pricing')}</Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout direction="horizontal">
                <form.AppField name="price">
                  {(field) => (
                    <field.GenericInput
                      isRequired
                      label={t('create.product.form.price.label')}
                      description={t('create.product.form.price.description')}
                    />
                  )}
                </form.AppField>
                <form.AppField name="regular_price">
                  {(field) => (
                    <field.GenericInput
                      label={t('create.product.form.regular_price.label')}
                      description={t(
                        'create.product.form.regular_price.description',
                      )}
                    />
                  )}
                </form.AppField>
                <form.AppField name="purchase_price">
                  {(field) => (
                    <field.GenericInput
                      isRequired
                      label={t('create.product.form.purchase_price.label')}
                      description={t(
                        'create.product.form.purchase_price.description',
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

export default Pricing
