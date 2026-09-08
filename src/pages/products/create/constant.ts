import type { TranslatorFn } from "@astryxdesign/core/i18n"
import type { CreateProductMutationT } from "@/schemas/product"

export const PRODUCT_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const

export const PRODUCT_CONDITION = {
  NEW: "NEW",
  REFURBISHED: "REFURBISHED",
  USED: "USED",
} as const

export const createProductDefaultValue: CreateProductMutationT = {
  mode: "create",
  name: "",
  description: "",
  short_description: "",
  medias: [],
  status: PRODUCT_STATUS.INACTIVE,
  category_ids: [],
  price: 0,
  regular_price: 0,
  purchase_price: 0,
  slug: "",
  stock_quantity: 0,
  serial: "",
  sku: "",
  condition: PRODUCT_CONDITION.NEW,
  specifications: [
    {
      key: "",
      value: "",
    },
  ],
  variants: [],
}

export const getProductStatusOptions = (t: TranslatorFn) => [
  {
    value: PRODUCT_STATUS.ACTIVE,
    label: t("create.product.form.status.options.active"),
  },
  {
    value: PRODUCT_STATUS.INACTIVE,
    label: t("create.product.form.status.options.inactive"),
  },
]

export const getProductConditionOptions = (t: TranslatorFn) => [
  {
    value: PRODUCT_CONDITION.NEW,
    label: t("create.product.form.condition.options.new"),
  },
  {
    value: PRODUCT_CONDITION.REFURBISHED,
    label: t("create.product.form.condition.options.refurbished"),
  },
  {
    value: PRODUCT_CONDITION.USED,
    label: t("create.product.form.condition.options.used"),
  },
]
