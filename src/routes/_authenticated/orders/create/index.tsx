import { createFileRoute } from "@tanstack/react-router"
import CreateOrderPage from "@/pages/orders/create-order/create-order-page"

export const Route = createFileRoute("/_authenticated/orders/create/")({
  component: CreateOrderPage,
  loader: ({ context }) =>
    context.queryClient.query({
      queryKey: ["products"],
      queryFn: async () => {
        const response = await fetch("/api/products")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        return response.json()
      },
    }),
})
