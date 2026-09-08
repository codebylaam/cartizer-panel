import { formOptions } from '@tanstack/react-form'

import { createOrderDefaultValue } from './constant'
import { OrderMutationSchema } from '@/schemas/order'

export const createOrderFormOpt = formOptions({
  defaultValues: createOrderDefaultValue,
  validators: {
    onSubmit: OrderMutationSchema,
  },
})
