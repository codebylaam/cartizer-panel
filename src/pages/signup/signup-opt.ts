import { formOptions } from '@tanstack/react-form'

import {
  signupDefaultValues,
  signupSubmitSchema,
} from './signup.zod'

export const signupFormOpt = formOptions({
  defaultValues: signupDefaultValues,
  validators: {
    onSubmit: signupSubmitSchema,
  },
})
