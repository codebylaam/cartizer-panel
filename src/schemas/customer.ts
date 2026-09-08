import * as z from 'zod'
import { t } from 'i18next'

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
      .string(
        t(
          'create.customer.validation.password.required',
          'Password is required',
        ),
      )
      .min(
        6,
        t(
          'create.customer.validation.password.min',
          'Password must be at least 6 characters',
        ),
      ),
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
export type CustomerT = {
  id: string
  name: string
  email: string
  phone?: string | null
  created_at?: string
  updated_at?: string
}

export type CreateCustomerPayloadT = Omit<CreateCustomerT, 'mode' | 'id'>
