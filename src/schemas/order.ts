import * as z from 'zod'
import { t } from 'i18next'
import {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from '@/pages/orders/create-order/constant'

export const OrderedVariantOptionSchema = z.object({
  attribute: z.string(),
  extra_price: z.coerce.number<number>(),
  title: z.string().optional(),
})

export type OrderedVariantOptionPayload = z.infer<
  typeof OrderedVariantOptionSchema
>

export const OrderItemSchema = z.object({
  product_id: z.string().optional(),
  product_name: z
    .string()
    .min(
      1,
      t(
        'create.order.validation.product_name.required',
        'Product name is required',
      ),
    ),
  sku: z.string().optional(),
  unit_price: z.coerce.number<number>(),
  quantity: z.coerce.number<number>(),
  variants: z.array(OrderedVariantOptionSchema).optional(),
})

export const OrderMutationSchema = z.intersection(
  z.object({
    customer_name: z
      .string(t('create.order.validation.customer_name.required'))
      .min(2, t('create.order.validation.customer_name.required')),
    customer_phone: z
      .string(t('create.order.validation.customer_phone.required'))
      .min(6, t('create.order.validation.customer_phone.required')),
    payment_status: z.enum([
      PAYMENT_STATUS.PAID,
      PAYMENT_STATUS.UNPAID,
      PAYMENT_STATUS.PENDING,
      PAYMENT_STATUS.PARTIAL,
      PAYMENT_STATUS.REFUNDED,
    ]),
    payment_method: z.enum([
      PAYMENT_METHOD.BKASH,
      PAYMENT_METHOD.NAGAD,
      PAYMENT_METHOD.ROCKET,
      PAYMENT_METHOD.CASH_ON_DELIVERY,
      PAYMENT_METHOD.BANK_TRANSFER,
      PAYMENT_METHOD.CARD,
    ]),
    delivery_charge: z.coerce.number<number>(),
    discount: z.coerce.number<number>(),
    items: z
      .array(OrderItemSchema)
      .min(1, t('create.order.validation.items.min')),
  }),
  z.discriminatedUnion('mode', [
    z.object({
      mode: z.literal('create'),
    }),
    z.object({
      mode: z.literal('update'),
      id: z.uuid(),
    }),
  ]),
)

export type OrderItemT = z.infer<typeof OrderItemSchema>
export type CreateOrderT = z.infer<typeof OrderMutationSchema>
export type OrderT = CreateOrderT & {
  id?: string
  created_at?: string
  updated_at?: string
}

export type CreateOrderPayloadT = Omit<CreateOrderT, 'mode' | 'id'>
