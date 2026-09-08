import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext } from "@tanstack/react-router"

// import { setSSRLanguage } from "@/lib/i18";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Cartizer - Dashboard",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "use-credentials",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Alice&family=Figtree:ital,wght@0,300..900;1,300..900&family=Noto+Sans+Bengali:wght@100..900&family=Noto+Serif+Bengali:wght@100..900&display=swap",
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return children
}
