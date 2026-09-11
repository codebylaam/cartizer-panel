import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { Theme } from "@astryxdesign/core/theme"
import { LinkProvider } from "@astryxdesign/core/Link"
import {
  Link,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "@astryxdesign/core/reset.css"
import "./themes/cartizer.css"
import "./index.css"
import { cartizerTheme } from "./themes/cartizer"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import "./utils/i18"
import { ApiService } from "./services/api"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      queryFn: async ({ queryKey, pageParam, meta }) => {
        const response = await ApiService.get({
          url: `${queryKey[0]}`,
          config: {
            params: pageParam,
            withCredentials: meta?.withCredentials ? true : false,
          },
        })
        return response
      },
    },
    mutations: {
      retry: 0,
      mutationFn: async (payload, { meta, mutationKey }) => {
        const method = meta?.method || "POST"
        if (!mutationKey)
          throw new Error("Mutation key is required for mutationFn")

        switch (method) {
          case "POST":
            return ApiService.post({
              url: `${mutationKey[0]}`,
              payload,
            })
          case "PUT":
            return ApiService.put({
              url: `${mutationKey[0]}`,
              payload,
            })
          case "DELETE":
            return ApiService.delete({ url: `${mutationKey[0]}` })
          default:
            return ApiService.post({
              url: `${mutationKey[0]}`,
              payload,
            })
        }
      },
    },
  },
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Theme theme={cartizerTheme} mode="system">
          <LinkProvider component={Link}>
            <RouterProvider router={router} />
          </LinkProvider>
        </Theme>
      </QueryClientProvider>
    </StrictMode>,
  )
}
