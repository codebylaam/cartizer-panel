import * as z from 'zod'
import { t } from 'i18next'

export const CUSTOMER_ACCOUNT_STATUS = {
  UNCLAIMED: 'UNCLAIMED',
  ACTIVE: 'ACTIVE',
} as const

export const CUSTOMER_CREATED_BY = {
  SELLER: 'SELLER',
  CUSTOMER: 'CUSTOMER',
} as const

export const CUSTOMER_ADDRESS_TYPE = {
  SHIPPING: 'SHIPPING',
  BILLING: 'BILLING',
} as const

export const CustomerAddressSchema = z.object({
  address_1: z
    .string(
      t(
        'create.customer.validation.address_1.required',
        'Address is required',
      ),
    )
    .min(
      1,
      t(
        'create.customer.validation.address_1.required',
        'Address is required',
      ),
    ),
  address_2: z.string().optional(),
  city: z
    .string(t('create.customer.validation.city.required', 'City is required'))
    .min(
      1,
      t('create.customer.validation.city.required', 'City is required'),
    ),
  state: z
    .string(t('create.customer.validation.state.required', 'State is required'))
    .min(
      1,
      t('create.customer.validation.state.required', 'State is required'),
    ),
  postal_code: z
    .string(
      t(
        'create.customer.validation.postal_code.required',
        'Postal code is required',
      ),
    )
    .min(
      1,
      t(
        'create.customer.validation.postal_code.required',
        'Postal code is required',
      ),
    )
    .max(
      20,
      t(
        'create.customer.validation.postal_code.max',
        'Postal code must be at most 20 characters',
      ),
    ),
  country: z
    .string()
    .max(
      10,
      t(
        'create.customer.validation.country.max',
        'Country must be at most 10 characters',
      ),
    )
    .optional(),
})

export type CustomerAddressT = z.infer<typeof CustomerAddressSchema>

export const CustomerMutationSchema = z.intersection(
  z.object({
    name: z
      .string(t('create.customer.validation.name.required', 'Name is required'))
      .min(
        2,
        t(
          'create.customer.validation.name.min',
          'Name must be at least 2 characters',
        ),
      ),
    email: z
      .string(
        t('create.customer.validation.email.required', 'Email is required'),
      )
      .email(
        t('create.customer.validation.email.invalid', 'Invalid email address'),
      ),
    phone: z.string().optional(),
    password: z
      .string()
      .min(
        6,
        t(
          'create.customer.validation.password.min',
          'Password must be at least 6 characters',
        ),
      )
      .optional()
      .or(z.literal('')),
    shipping_address: CustomerAddressSchema.optional(),
    billing_address: CustomerAddressSchema.optional(),
  }),
  z.discriminatedUnion('mode', [
    z.object({
      mode: z.literal('create'),
    }),
    z.object({
      mode: z.literal('update'),
      id: z.string().uuid(),
    }),
  ]),
)

export type CreateCustomerT = z.infer<typeof CustomerMutationSchema>
export type CustomerAccountStatusT =
  (typeof CUSTOMER_ACCOUNT_STATUS)[keyof typeof CUSTOMER_ACCOUNT_STATUS]
export type CustomerCreatedByT =
  (typeof CUSTOMER_CREATED_BY)[keyof typeof CUSTOMER_CREATED_BY]

export type CustomerT = {
  id: string
  name: string
  email: string
  phone?: string | null
  account_status: CustomerAccountStatusT
  created_by: CustomerCreatedByT
  seller_id?: string
  created_at?: string
  updated_at?: string
}

export type CreateCustomerPayloadT = Omit<CreateCustomerT, 'mode' | 'id'>
