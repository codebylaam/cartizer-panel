import type { TFunction } from 'i18next'
import type { CreateOrderT } from '@/schemas/order'

// These must mirror the database enums in the backend
// (`order.validation.ts` pipes every value through `z.enum`), otherwise the
// API rejects the payload with a validation error.
export const PAYMENT_STATUS = {
  UNPAID: 'UNPAID',
  PAID: 'PAID',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  REFUNDED: 'REFUNDED',
} as const

export const PAYMENT_METHOD = {
  COD: 'COD',
  ONLINE: 'ONLINE',
  BKASH: 'BKASH',
  NAGAD: 'NAGAD',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CASH: 'CASH',
  OTHER: 'OTHER',
} as const

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const

export const createOrderDefaultValue: CreateOrderT = {
  mode: 'create',
  customer_name: 'Guest Customer',
  customer_phone: '+8801912345670',
  customer_email: '',
  status: ORDER_STATUS.PENDING,
  payment_status: PAYMENT_STATUS.UNPAID,
  payment_method: PAYMENT_METHOD.COD,
  delivery_charge: 0,
  discount: 10,
  notes: '',
  items: [],
}

export const getPaymentStatusOptions = (t: TFunction) => [
  {
    value: PAYMENT_STATUS.UNPAID,
    label: t('create.order.form.payment_status.options.unpaid', 'Unpaid'),
  },
  {
    value: PAYMENT_STATUS.PAID,
    label: t('create.order.form.payment_status.options.paid', 'Paid'),
  },
  {
    value: PAYMENT_STATUS.PARTIALLY_PAID,
    label: t(
      'create.order.form.payment_status.options.partially_paid',
      'Partially Paid',
    ),
  },
  {
    value: PAYMENT_STATUS.REFUNDED,
    label: t('create.order.form.payment_status.options.refunded', 'Refunded'),
  },
]

export const getPaymentMethodOptions = (t: TFunction) => [
  {
    value: PAYMENT_METHOD.COD,
    label: t(
      'create.order.form.payment_method.options.cod',
      'Cash on Delivery',
    ),
  },
  {
    value: PAYMENT_METHOD.ONLINE,
    label: t('create.order.form.payment_method.options.online', 'Online'),
  },
  {
    value: PAYMENT_METHOD.BKASH,
    label: t('create.order.form.payment_method.options.bkash', 'bKash'),
  },
  {
    value: PAYMENT_METHOD.NAGAD,
    label: t('create.order.form.payment_method.options.nagad', 'Nagad'),
  },
  {
    value: PAYMENT_METHOD.BANK_TRANSFER,
    label: t(
      'create.order.form.payment_method.options.bank_transfer',
      'Bank Transfer',
    ),
  },
  {
    value: PAYMENT_METHOD.CASH,
    label: t('create.order.form.payment_method.options.cash', 'Cash'),
  },
  {
    value: PAYMENT_METHOD.OTHER,
    label: t('create.order.form.payment_method.options.other', 'Other'),
  },
]

export const getOrderStatusOptions = (t: TFunction) => [
  {
    value: ORDER_STATUS.PENDING,
    label: t('page.order.status.pending', 'Pending'),
  },
  {
    value: ORDER_STATUS.PROCESSING,
    label: t('page.order.status.processing', 'Processing'),
  },
  {
    value: ORDER_STATUS.SHIPPED,
    label: t('page.order.status.shipped', 'Shipped'),
  },
  {
    value: ORDER_STATUS.DELIVERED,
    label: t('page.order.status.delivered', 'Delivered'),
  },
  {
    value: ORDER_STATUS.CANCELLED,
    label: t('page.order.status.cancelled', 'Cancelled'),
  },
  {
    value: ORDER_STATUS.REFUNDED,
    label: t('page.order.status.refunded', 'Refunded'),
  },
]
