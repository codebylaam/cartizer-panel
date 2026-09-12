import * as z from 'zod'
import { t } from 'i18next'

import { DEFAULT_LANGUAGE, SHOP_TYPE } from '@/pages/shop/settings/constant'

export const ShopMutationSchema = z.object({
  name: z
    .string(t('page.shop.validation.name.required'))
    .min(2, t('page.shop.validation.name.min'))
    .max(100, t('page.shop.validation.name.max')),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z
    .string(t('page.shop.validation.phone.max'))
    .max(50, t('page.shop.validation.phone.max'))
    .optional(),
  email: z
    .union([
      z.email(t('page.shop.validation.email.invalid')),
      z.literal(''),
    ])
    .optional(),
  country: z
    .string(t('page.shop.validation.country.max'))
    .max(100, t('page.shop.validation.country.max'))
    .optional(),
  announcement: z.string().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  primary_color: z
    .string(t('page.shop.validation.primary_color.max'))
    .max(50, t('page.shop.validation.primary_color.max'))
    .optional(),
  shop_type: z.enum([SHOP_TYPE.ONLINE, SHOP_TYPE.PHYSICAL, SHOP_TYPE.BOTH]),
  default_language: z.enum([DEFAULT_LANGUAGE.EN, DEFAULT_LANGUAGE.BN]),
  show_product_sold_count: z.boolean(),
  show_email_field_place_order: z.boolean(),
  auto_select_mandatory_variant: z.boolean(),
})

export type ShopT = z.infer<typeof ShopMutationSchema>
