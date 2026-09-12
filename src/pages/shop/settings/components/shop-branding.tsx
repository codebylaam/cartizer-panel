import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'

import { shopSettingsFormOpt } from '../shop-settings-opt'
import { withForm } from '@/components/generic-inputs/field-context'

const ShopBranding = withForm({
  ...shopSettingsFormOpt,
  render: function ShopBrandingCard({ form }) {
    const { t } = useTranslation()

    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">{t('page.shop.section.branding')}</Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout>
                <FormLayout direction="horizontal">
                  <form.AppField name="logo">
                    {(field) => (
                      <field.GenericInput
                        label={t('page.shop.field.logo.label')}
                        placeholder={t('page.shop.field.logo.placeholder')}
                      />
                    )}
                  </form.AppField>

                  <form.AppField name="favicon">
                    {(field) => (
                      <field.GenericInput
                        label={t('page.shop.field.favicon.label')}
                        placeholder={t('page.shop.field.favicon.placeholder')}
                      />
                    )}
                  </form.AppField>
                </FormLayout>

                <form.AppField name="primary_color">
                  {(field) => (
                    <field.GenericInput
                      label={t('page.shop.field.primary_color.label')}
                      placeholder={t('page.shop.field.primary_color.placeholder')}
                      description={t(
                        'page.shop.field.primary_color.description',
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="announcement">
                  {(field) => (
                    <field.GenericTextarea
                      label={t('page.shop.field.announcement.label')}
                      placeholder={t('page.shop.field.announcement.placeholder')}
                      description={t(
                        'page.shop.field.announcement.description',
                      )}
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

export default ShopBranding
