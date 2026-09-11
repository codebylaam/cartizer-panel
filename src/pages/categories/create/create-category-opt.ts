import { formOptions } from '@tanstack/react-form'

import { createCategoryDefaultValue } from './constant'
import { CreateCategorySchema } from '@/schemas/category'

export const createCategoryFormOpt = formOptions({
  defaultValues: createCategoryDefaultValue,
  validators: {
    onSubmit: CreateCategorySchema,
  },
})
