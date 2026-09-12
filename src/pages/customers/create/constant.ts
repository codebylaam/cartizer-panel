import type { CreateCustomerT } from '@/schemas/customer'

export const createCustomerDefaultValue: CreateCustomerT = {
  mode: 'create',
  name: '',
  email: '',
  phone: '',
  password: '',
  shipping_address: undefined,
  billing_address: undefined,
}
