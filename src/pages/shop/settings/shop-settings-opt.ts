import { formOptions } from '@tanstack/react-form'

import { ShopMutationSchema } from '@/schemas/shop'
import { shopSettingsDefaultValue } from './constant'

export const shopSettingsFormOpt = formOptions({
  defaultValues: shopSettingsDefaultValue,
  validators: {
    onSubmit: ShopMutationSchema,
  },
})
