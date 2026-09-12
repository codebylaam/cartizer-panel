import type { TFunction } from 'i18next'
import type { ShopT } from '@/schemas/shop'

// These must mirror the database enums in the backend (`shop.validation.ts`),
// otherwise the API rejects the payload with a validation error.
export const SHOP_TYPE = {
  ONLINE: 'ONLINE',
  PHYSICAL: 'PHYSICAL',
  BOTH: 'BOTH',
} as const

export const DEFAULT_LANGUAGE = {
  EN: 'EN',
  BN: 'BN',
} as const

export const shopSettingsDefaultValue: ShopT = {
  name: '',
  description: '',
  address: '',
  phone: '',
  email: '',
  country: '',
  announcement: '',
  logo: '',
  favicon: '',
  primary_color: '',
  shop_type: SHOP_TYPE.ONLINE,
  default_language: DEFAULT_LANGUAGE.EN,
  show_product_sold_count: true,
  show_email_field_place_order: false,
  auto_select_mandatory_variant: true,
}

export const getShopTypeOptions = (t: TFunction) => [
  {
    value: SHOP_TYPE.ONLINE,
    label: t('page.shop.field.shop_type.options.online', 'Online'),
  },
  {
    value: SHOP_TYPE.PHYSICAL,
    label: t('page.shop.field.shop_type.options.physical', 'Physical'),
  },
  {
    value: SHOP_TYPE.BOTH,
    label: t('page.shop.field.shop_type.options.both', 'Both'),
  },
]

export const getDefaultLanguageOptions = (t: TFunction) => [
  {
    value: DEFAULT_LANGUAGE.EN,
    label: t('general.english', 'English'),
  },
  {
    value: DEFAULT_LANGUAGE.BN,
    label: t('general.bengali', 'Bengali'),
  },
]
