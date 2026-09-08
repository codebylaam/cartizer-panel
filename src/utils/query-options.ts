import { queryOptions, type UseQueryOptions } from "@tanstack/react-query"
import type { GlobalSuccessResponse } from "@/types/response"
import { ApiService } from "@/services/api"

export default function reactQueryOptions<T, TIsArray extends boolean = false>(
  options: Omit<
    UseQueryOptions<GlobalSuccessResponse<T, TIsArray>>,
    "queryFn"
  > & {
    url: string
  },
) {
  return queryOptions({
    ...options,
    queryFn: () => ApiService.get<T, TIsArray>({ url: options.url }),
  })
}
