import { isAxiosError } from 'axios'
import type { TFunction } from 'i18next'

import type { GlobalErrorResponse } from '@/types/response'
import { toast } from '@/components/ui/toast'

class Toaster {
  success(message: string, t: TFunction) {
    toast.add({ title: t(message), type: 'success' })
  }

  error(message: string, t: TFunction) {
    toast.add({ title: t(message), type: 'error' })
  }

  warning(message: string, t: TFunction) {
    toast.add({ title: t(message), type: 'warning' })
  }

  info(message: string, t: TFunction) {
    toast.add({ title: t(message), type: 'info' })
  }

  handleError(error: unknown, t: TFunction) {
    if (isAxiosError<GlobalErrorResponse>(error)) {
      this.error(error.response?.data.message || error.message, t)
    } else if (error instanceof Error) {
      this.error(error.message, t)
    } else {
      this.error('unhandled_error', t)
    }
  }
}

export const ToasterService = new Toaster()
