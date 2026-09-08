import { createFileRoute } from "@tanstack/react-router"

import type { CreateProductMutationT } from "@/schemas/product"
import reactQueryOptions from "@/utils/query-options"
import CreateProductPage from "@/pages/products/create/create-product-page"

export const Route = createFileRoute("/_authenticated/products/$id")({
  component: CreateProductPage,
  pendingComponent: () => <p>Loading...</p>,
  loader: async ({ params, context }) => {
    if (params.id === "create") {
      return { product: null }
    } else {
      const response = await context.queryClient.query(
        reactQueryOptions<CreateProductMutationT>({
          url: `/api/products/${params.id}`,
          queryKey: ["product", params.id],
        }),
      )
      return { product: response.data }
    }
  },
})
