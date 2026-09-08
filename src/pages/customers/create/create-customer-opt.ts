import { formOptions } from '@tanstack/react-form'

import { createCustomerDefaultValue } from './constant'
import { CustomerMutationSchema } from '@/schemas/customer'

export const createCustomerFormOpt = formOptions({
  defaultValues: createCustomerDefaultValue,
  validators: {
    onSubmit: CustomerMutationSchema,
  },
})
