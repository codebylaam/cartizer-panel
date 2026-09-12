import * as z from 'zod'
import { t } from 'i18next'
import {
  ORDER_STATUS,
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
    customer_email: z
      .union([
        z.email(t('create.order.validation.customer_email.invalid')),
        z.literal(''),
      ])
      .optional(),
    status: z
      .enum([
        ORDER_STATUS.PENDING,
        ORDER_STATUS.PROCESSING,
        ORDER_STATUS.SHIPPED,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.CANCELLED,
        ORDER_STATUS.REFUNDED,
      ])
      .optional(),
    payment_status: z.enum([
      PAYMENT_STATUS.UNPAID,
      PAYMENT_STATUS.PAID,
      PAYMENT_STATUS.PARTIALLY_PAID,
      PAYMENT_STATUS.REFUNDED,
    ]),
    payment_method: z.enum([
      PAYMENT_METHOD.COD,
      PAYMENT_METHOD.ONLINE,
      PAYMENT_METHOD.BKASH,
      PAYMENT_METHOD.NAGAD,
      PAYMENT_METHOD.BANK_TRANSFER,
      PAYMENT_METHOD.CASH,
      PAYMENT_METHOD.OTHER,
    ]),
    delivery_charge: z.coerce.number<number>(),
    discount: z.coerce.number<number>(),
    notes: z.string().optional(),
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

export const ShippingAddressSchema = z.object({
  address_1: z.string(),
  address_2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string().optional(),
})

export type ShippingAddressT = z.infer<typeof ShippingAddressSchema>

export type OrderItemT = z.infer<typeof OrderItemSchema>
export type CreateOrderT = z.infer<typeof OrderMutationSchema>
export type OrderT = CreateOrderT & {
  id?: string
  order_number?: string
  customer_email?: string | null
  shipping_address?: ShippingAddressT | null
  status?: string
  subtotal?: number | string
  total?: number | string
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export type CreateOrderPayloadT = Omit<CreateOrderT, 'mode' | 'id'>
