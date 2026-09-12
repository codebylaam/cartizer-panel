import { useTranslation } from "react-i18next"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { Center, Text } from "@astryxdesign/core"

import SignupPage from "@/pages/signup/signup-page"

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  loader: async ({ context }) => {
    // `/auth/me` rejects for signed-out visitors, which is the expected state
    // here — only a successful call means there is an account to redirect.
    try {
      await context.queryClient.query({
        queryKey: ["auth", "me"],
        meta: { withCredentials: true },
      })
    } catch {
      return
    }

    throw redirect({ to: "/dashboard" })
  },
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
})

function PendingComponent() {
  const { t } = useTranslation()
  return (
    <Center axis="both" style={{ minHeight: "100vh" }}>
      <Text type="body" color="secondary">
        {t("table_global.loading")}
      </Text>
    </Center>
  )
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <Center axis="both" style={{ minHeight: "100vh" }}>
      <Text type="body" color="secondary">
        {error.message}
      </Text>
    </Center>
  )
}
