import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'

import { createProductFormOpt } from '../create-product-opt'
import { withForm } from '@/components/generic-inputs/field-context'

const Inventory = withForm({
  ...createProductFormOpt,
  render: function ({ form }) {
    const { t } = useTranslation()
    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">{t('create.product.form.inventory')}</Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout direction="horizontal">
                <form.AppField name="serial">
                  {(field) => (
                    <field.GenericInput
                      label={t('create.product.form.serial.label')}
                      description={t('create.product.form.serial.description')}
                    />
                  )}
                </form.AppField>

                <form.AppField name="sku">
                  {(field) => (
                    <field.GenericInput
                      label={t('create.product.form.sku.label')}
                      description={t('create.product.form.sku.description')}
                    />
                  )}
                </form.AppField>

                <form.AppField name="stock_quantity">
                  {(field) => (
                    <field.GenericInput
                      isRequired
                      label={t('create.product.form.stock_quantity.label')}
                      description={t(
                        'create.product.form.stock_quantity.description',
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

export default Inventory
