import { useToast } from '@astryxdesign/core'
import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { VStack } from '@astryxdesign/core/VStack'
import { Grid, GridSpan } from '@astryxdesign/core/Grid'

import Module from '@/components/module/module'
import ShopDetails from './components/shop-details'
import ShopBranding from './components/shop-branding'
import ShopPreferences from './components/shop-preferences'
import { useReactMutation } from '@/hooks/use-query'
import { shopSettingsFormOpt } from './shop-settings-opt'
import { useAppForm } from '@/components/generic-inputs/field-context'
import type { ShopT } from '@/schemas/shop'

type ShopSettingsPageProps = {
  shop: ShopT
}

// The API returns nullable columns; the inputs need strings.
function toFormValues(shop: ShopT): ShopT {
  return {
    name: shop.name,
    description: shop.description ?? '',
    address: shop.address ?? '',
    phone: shop.phone ?? '',
    email: shop.email ?? '',
    country: shop.country ?? '',
    announcement: shop.announcement ?? '',
    logo: shop.logo ?? '',
    favicon: shop.favicon ?? '',
    primary_color: shop.primary_color ?? '',
    shop_type: shop.shop_type,
    default_language: shop.default_language,
    show_product_sold_count: shop.show_product_sold_count,
    show_email_field_place_order: shop.show_email_field_place_order,
    auto_select_mandatory_variant: shop.auto_select_mandatory_variant,
  }
}

export default function ShopSettingsPage({ shop }: ShopSettingsPageProps) {
  const toast = useToast()
  const { t } = useTranslation()

  const updateShopMutation = useReactMutation({
    url: '/shop',
    method: 'PUT',
  })

  const form = useAppForm({
    ...shopSettingsFormOpt,
    defaultValues: toFormValues(shop),
    onSubmit: ({ value }) => {
      // `email` is optional on the API but the field is always a string in the
      // form, so an empty value must be omitted rather than sent.
      const payload = { ...value, email: value.email || undefined }

      updateShopMutation.mutate(payload, {
        onSuccess: (response) => {
          toast({ body: t(response.message) })
        },
        onError: (error) => {
          toast({ body: t(error.message), type: 'error' })
        },
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <Module>
        <Module.Header>
          <VStack gap={1}>
            <Module.Title>{t('page.shop.title')}</Module.Title>
            <Text type="body" color="secondary">
              {t('page.shop.description')}
            </Text>
          </VStack>

          <form.Subscribe
            selector={(state) => ({
              isValid: state.isValid,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ isValid, isSubmitting }) => (
              <Button
                label={t('page.shop.save')}
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                isDisabled={!isValid}
              />
            )}
          </form.Subscribe>
        </Module.Header>

        <Module.Content>
          <Grid columns={12} gap={4} align="start">
            <GridSpan columns={8}>
              <VStack gap={4}>
                <ShopDetails form={form} />
                <ShopBranding form={form} />
              </VStack>
            </GridSpan>

            <GridSpan columns={4}>
              <VStack gap={4}>
                <ShopPreferences form={form} />
              </VStack>
            </GridSpan>
          </Grid>
        </Module.Content>
      </Module>
    </form>
  )
}
