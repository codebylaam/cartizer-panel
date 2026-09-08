import type { CreateCustomerT } from '@/schemas/customer'

export const createCustomerDefaultValue: CreateCustomerT = {
  mode: 'create',
  name: '',
  email: '',
  phone: '',
  password: '',
}
