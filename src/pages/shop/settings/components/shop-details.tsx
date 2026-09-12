import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'

import { shopSettingsFormOpt } from '../shop-settings-opt'
import { withForm } from '@/components/generic-inputs/field-context'

const ShopDetails = withForm({
  ...shopSettingsFormOpt,
  render: function ShopDetailsCard({ form }) {
    const { t } = useTranslation()

    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">{t('page.shop.section.details')}</Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout>
                <form.AppField name="name">
                  {(field) => (
                    <field.GenericInput
                      isRequired
                      label={t('page.shop.field.name.label')}
                      placeholder={t('page.shop.field.name.placeholder')}
                      description={t('page.shop.field.name.description')}
                    />
                  )}
                </form.AppField>

                <form.AppField name="description">
                  {(field) => (
                    <field.GenericTextarea
                      label={t('page.shop.field.description.label')}
                      placeholder={t('page.shop.field.description.placeholder')}
                      description={t('page.shop.field.description.description')}
                      rows={3}
                    />
                  )}
                </form.AppField>

                <FormLayout direction="horizontal">
                  <form.AppField name="phone">
                    {(field) => (
                      <field.GenericInput
                        label={t('page.shop.field.phone.label')}
                        placeholder={t('page.shop.field.phone.placeholder')}
                      />
                    )}
                  </form.AppField>

                  <form.AppField name="email">
                    {(field) => (
                      <field.GenericInput
                        type="email"
                        label={t('page.shop.field.email.label')}
                        placeholder={t('page.shop.field.email.placeholder')}
                      />
                    )}
                  </form.AppField>
                </FormLayout>

                <form.AppField name="country">
                  {(field) => (
                    <field.GenericInput
                      label={t('page.shop.field.country.label')}
                      placeholder={t('page.shop.field.country.placeholder')}
                    />
                  )}
                </form.AppField>

                <form.AppField name="address">
                  {(field) => (
                    <field.GenericTextarea
                      label={t('page.shop.field.address.label')}
                      placeholder={t('page.shop.field.address.placeholder')}
                      rows={2}
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

export default ShopDetails
