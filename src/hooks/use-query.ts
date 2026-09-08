import { useEffect } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import type {
  UseQueryOptions,
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query"

import { ApiService } from "@/services/api"
import type { GlobalSuccessResponse } from "@/types/response"

type QueryOptions<T, TIsArray extends boolean = false> = Omit<
  UseQueryOptions<GlobalSuccessResponse<T, TIsArray>>,
  "queryFn"
> & {
  url: string
  onSuccess?: (data: GlobalSuccessResponse<T, TIsArray>) => void
  onError?: (error: Error) => void
}

export function useReactQuery<T, TIsArray extends boolean = false>(
  options: QueryOptions<T, TIsArray>,
  client?: QueryClient,
) {
  const query = useQuery(
    {
      ...options,
      queryFn: async () =>
        await ApiService.get<T, TIsArray>({ url: options.url }),
    },
    client,
  )
  useEffect(() => {
    if (query.error) {
      options.onError?.(query.error)
    }
    if (query.data && query.data.success) {
      options.onSuccess?.(query.data)
    }
  }, [query.error, query.data, options])

  return query
}

type MutationOptions<PayloadT, ResponseT> = UseMutationOptions<
  GlobalSuccessResponse<ResponseT>,
  Error,
  PayloadT
> & {
  url: string
  method?: "POST" | "PUT" | "DELETE"
  onSuccess?: (data: GlobalSuccessResponse<ResponseT>) => void
  onError?: (error: Error) => void
}
export function useReactMutation<PayloadT, ResponseT>(
  options: MutationOptions<PayloadT, ResponseT>,
) {
  return useMutation({
    ...options,
    mutationFn: () => {
      switch (options.method) {
        case "POST":
          return ApiService.post<ResponseT>({ url: options.url })
        case "PUT":
          return ApiService.put<ResponseT>({ url: options.url })
        case "DELETE":
          return ApiService.delete<ResponseT>({ url: options.url })
        default:
          return ApiService.post<ResponseT>({ url: options.url })
      }
    },
    onSuccess(data) {
      options.onSuccess?.(data)
    },
    onError(error) {
      options.onError?.(error)
    },
  })
}
