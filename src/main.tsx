import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { Theme } from "@astryxdesign/core/theme"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { neutralTheme } from "@astryxdesign/theme-neutral/built"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "@astryxdesign/theme-neutral/theme.css"
import "@astryxdesign/core/reset.css"
import "./index.css"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import "./utils/i18"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
    mutations: {
      retry: 0,
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
        <Theme theme={neutralTheme} mode="system">
          <RouterProvider router={router} />
        </Theme>
      </QueryClientProvider>
    </StrictMode>,
  )
}
