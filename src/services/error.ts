import { isAxiosError } from 'axios'
import type { TFunction } from 'i18next'

import type { GlobalErrorResponse } from '@/types/response'

class CustomError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CustomError'
  }

  static handleError(error: unknown, t: TFunction) {
    if (isAxiosError<GlobalErrorResponse>(error)) {
      return new Error(t(error.response?.data.message || error.message))
    } else if (error instanceof Error) {
      return new Error(t(error.message))
    } else {
      return new Error(t('unhandled_error'))
    }
  }
}

export default CustomError
