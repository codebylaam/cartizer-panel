import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import { AppShell } from "@astryxdesign/core/AppShell"

import AppSideBarV2 from "@/components/application-sidebar/app-sidebar-v2"

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,

  loader: async ({ context }) => {
    try {
      const data = await context.queryClient.query({
        queryKey: ["auth/me"],
        meta: { withCredentials: true },
      })

      return data
    } catch (error) {
      throw redirect({ to: "/login" })
    }
  },
  errorComponent: ({ error }) => {
    return <div>{error.message}</div>
  },
})

function RouteComponent() {
  return (
    <AppShell sideNav={<AppSideBarV2 />}>
      <div
        style={{
          minHeight: "100%",
          maxWidth: "calc(260 * 4px)",
          marginInline: "auto",
          paddingBlock: "1rem",
        }}
      >
        <Outlet />
      </div>
    </AppShell>
  )
}
