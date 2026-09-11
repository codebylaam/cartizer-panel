import { queryOptions, type UseQueryOptions } from "@tanstack/react-query"
import type { AxiosRequestConfig } from "axios"

import { ApiService } from "@/services/api"
import type { GlobalSuccessResponse } from "@/types/response"

export default function reactQueryOptions<T, TIsArray extends boolean = false>(
  options: Omit<
    UseQueryOptions<GlobalSuccessResponse<T, TIsArray>>,
    "queryFn"
  > & {
    url: string
    config?: AxiosRequestConfig
  },
) {
  const { url, config, ...rest } = options
  return queryOptions({
    ...rest,
    queryFn: () => ApiService.get<T, TIsArray>({ url, config }),
  })
}
