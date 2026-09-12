import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'

import { shopSettingsFormOpt } from '../shop-settings-opt'
import {
  getDefaultLanguageOptions,
  getShopTypeOptions,
} from '../constant'
import { withForm } from '@/components/generic-inputs/field-context'

const ShopPreferences = withForm({
  ...shopSettingsFormOpt,
  render: function ShopPreferencesCard({ form }) {
    const { t } = useTranslation()

    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">{t('page.shop.section.preferences')}</Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout>
                <form.AppField name="shop_type">
                  {(field) => (
                    <field.GenericSelect
                      label={t('page.shop.field.shop_type.label')}
                      options={getShopTypeOptions(t)}
                      description={t('page.shop.field.shop_type.description')}
                    />
                  )}
                </form.AppField>

                <form.AppField name="default_language">
                  {(field) => (
                    <field.GenericSelect
                      label={t('page.shop.field.default_language.label')}
                      options={getDefaultLanguageOptions(t)}
                      description={t(
                        'page.shop.field.default_language.description',
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="show_product_sold_count">
                  {(field) => (
                    <field.GenericSwitch
                      label={t('page.shop.field.show_product_sold_count.label')}
                      description={t(
                        'page.shop.field.show_product_sold_count.description',
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="show_email_field_place_order">
                  {(field) => (
                    <field.GenericSwitch
                      label={t(
                        'page.shop.field.show_email_field_place_order.label',
                      )}
                      description={t(
                        'page.shop.field.show_email_field_place_order.description',
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="auto_select_mandatory_variant">
                  {(field) => (
                    <field.GenericSwitch
                      label={t(
                        'page.shop.field.auto_select_mandatory_variant.label',
                      )}
                      description={t(
                        'page.shop.field.auto_select_mandatory_variant.description',
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

export default ShopPreferences
