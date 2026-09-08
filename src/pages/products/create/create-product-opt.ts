import { formOptions } from '@tanstack/react-form'

import { createProductDefaultValue } from './constant'
import { ProductMutationSchema } from '@/schemas/product'

export const createProductFormOpt = formOptions({
  defaultValues: createProductDefaultValue,
  validators: {
    onSubmit: ProductMutationSchema,
  },
})
