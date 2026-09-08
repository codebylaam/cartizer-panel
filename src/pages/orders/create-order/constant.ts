import type { TFunction } from 'i18next'
import type { CreateOrderT } from '@/schemas/order'

export const PAYMENT_STATUS = {
  PAID: 'PAID',
  UNPAID: 'UNPAID',
  PENDING: 'PENDING',
  PARTIAL: 'PARTIAL',
  REFUNDED: 'REFUNDED',
} as const

export const PAYMENT_METHOD = {
  BKASH: 'BKASH',
  NAGAD: 'NAGAD',
  ROCKET: 'ROCKET',
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CARD: 'CARD',
} as const

export const createOrderDefaultValue: CreateOrderT = {
  mode: 'create',
  customer_name: 'Guest Customer',
  customer_phone: '+8801912345670',
  payment_status: PAYMENT_STATUS.PENDING,
  payment_method: PAYMENT_METHOD.CASH_ON_DELIVERY,
  delivery_charge: 0,
  discount: 10,
  items: [],
}

export const getPaymentStatusOptions = (t: TFunction) => [
  {
    value: PAYMENT_STATUS.PAID,
    label: t('create.order.form.payment_status.options.paid', 'Paid'),
  },
  {
    value: PAYMENT_STATUS.UNPAID,
    label: t('create.order.form.payment_status.options.unpaid', 'Unpaid'),
  },
  {
    value: PAYMENT_STATUS.PENDING,
    label: t('create.order.form.payment_status.options.pending', 'Pending'),
  },
  {
    value: PAYMENT_STATUS.PARTIAL,
    label: t('create.order.form.payment_status.options.partial', 'Partial'),
  },
  {
    value: PAYMENT_STATUS.REFUNDED,
    label: t('create.order.form.payment_status.options.refunded', 'Refunded'),
  },
]

export const getPaymentMethodOptions = (t: TFunction) => [
  {
    value: PAYMENT_METHOD.BKASH,
    label: t('create.order.form.payment_method.options.bkash', 'bKash'),
  },
  {
    value: PAYMENT_METHOD.NAGAD,
    label: t('create.order.form.payment_method.options.nagad', 'Nagad'),
  },
  {
    value: PAYMENT_METHOD.ROCKET,
    label: t('create.order.form.payment_method.options.rocket', 'Rocket'),
  },
  {
    value: PAYMENT_METHOD.CASH_ON_DELIVERY,
    label: t(
      'create.order.form.payment_method.options.cash_on_delivery',
      'Cash on Delivery',
    ),
  },
  {
    value: PAYMENT_METHOD.BANK_TRANSFER,
    label: t(
      'create.order.form.payment_method.options.bank_transfer',
      'Bank Transfer',
    ),
  },
  {
    value: PAYMENT_METHOD.CARD,
    label: t('create.order.form.payment_method.options.card', 'Card'),
  },
]
