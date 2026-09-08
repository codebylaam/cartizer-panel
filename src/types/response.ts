export type GlobalSuccessResponse<T, TIsArray extends boolean = false> = {
  message: string
  status: number
  success: true
} & (TIsArray extends true
  ? {
      data: Array<T>
      meta?: {
        pagination: {
          page: number
          limit: number
          total: number
        }
      }
    }
  : { data: T })

export type GlobalErrorResponse = {
  message: string
  success: false
  status: number
  error: {
    code: number
    message: string
  }
}

export type GlobalResponse<T, TIsArray extends boolean = false> =
  GlobalSuccessResponse<T, TIsArray> | GlobalErrorResponse
