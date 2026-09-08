import { useState, type CSSProperties } from "react"
import { useTranslation } from "react-i18next"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
  useNavigate,
} from "@tanstack/react-router"
import {
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  PhoneIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/ssr"

import {
  Button,
  Card,
  Center,
  FormLayout,
  Heading,
  Icon,
  IconButton,
  InputGroup,
  Link,
  NavIcon,
  Text,
  TextInput,
  VStack,
  useToast,
} from "@astryxdesign/core"

import { loginSchema } from "@/pages/login/login.zod"
import { useAppForm } from "@/components/generic-inputs/field-context"
import { useReactMutation } from "@/hooks/use-query"

export const Route = createFileRoute("/login")({
  component: LoginPage,
  loader: async ({ context }) => {
    const data = await context.queryClient.query({ queryKey: ["auth", "me"] })
    if (data) {
      throw redirect({ to: "/dashboard" })
    }
  },
})

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "var(--color-background-body)",
}

const RouterAstryxLink = ({
  href,
  children,
  ...props
}: {
  href?: string
  children?: React.ReactNode
}) => (
  <RouterLink to={href} {...props}>
    {children}
  </RouterLink>
)

function LoginPage() {
  const { t } = useTranslation()
  const toast = useToast()
  const loginMutation = useReactMutation({
    url: "/api/auth/login",
  })

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const form = useAppForm({
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await loginMutation.mutateAsync({ data: value })
        toast({
          body: result.message || t("login.success"),
        })
        navigate({ to: "/dashboard" })
      } catch (error: any) {
        toast({
          body: error.message || t("login.error"),
          type: "error",
        })
      }
    },
    defaultValues: { identifier: "", password: "" },
  })

  return (
    <Center axis="both" padding={4} style={pageStyle}>
      <Card padding={8} width="100%" maxWidth={400} elevation="med">
        <VStack gap={6} hAlign="stretch">
          {/* Header Branding */}
          <VStack gap={2} hAlign="center">
            <NavIcon
              icon={<Icon icon={StorefrontIcon} size="lg" color="accent" />}
            />
            <Heading level={2} justify="center">
              {t("login.title", "Welcome Back")}
            </Heading>
            <Text type="body" color="secondary" size="sm" justify="center">
              {t(
                "login.description",
                "Sign in to access your Savizer merchant dashboard",
              )}
            </Text>
          </VStack>

          {/* Login Form */}
          <form
            onSubmit={(event) => {
              event.preventDefault()
              event.stopPropagation()
              form.handleSubmit()
            }}
          >
            <FormLayout direction="vertical">
              {/* Phone/Identifier Field */}
              <form.AppField name="identifier">
                {(field) => (
                  <TextInput
                    label={t("login.identifier", "Phone Number / Identifier")}
                    placeholder="01XXXXXXXXX"
                    startIcon={PhoneIcon}
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    status={
                      field.state.meta.errors.length > 0
                        ? {
                            type: "error",
                            message: field.state.meta.errors.join(", "),
                          }
                        : undefined
                    }
                    statusVariant="detached"
                  />
                )}
              </form.AppField>

              {/* Password Field */}
              <form.AppField name="password">
                {(field) => (
                  <InputGroup
                    label={t("login.password", "Password")}
                    status={
                      field.state.meta.errors.length > 0
                        ? {
                            type: "error",
                            message: field.state.meta.errors.join(", "),
                          }
                        : undefined
                    }
                  >
                    <TextInput
                      label={t("login.password", "Password")}
                      isLabelHidden
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      startIcon={LockKeyIcon}
                      value={field.state.value}
                      onChange={(val) => field.handleChange(val)}
                    />
                    <IconButton
                      label={showPassword ? "Hide password" : "Show password"}
                      icon={showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputGroup>
                )}
              </form.AppField>

              {/* Submit Button */}
              <form.Subscribe>
                {({ isSubmitting }) => (
                  <Button
                    label={t("login.submit", "Sign In")}
                    type="submit"
                    variant="primary"
                    width="100%"
                    isLoading={isSubmitting}
                  />
                )}
              </form.Subscribe>
            </FormLayout>
          </form>

          {/* Footer Navigation */}
          <VStack hAlign="center" gap={1}>
            <Text type="supporting" color="secondary">
              {t("login.noAccount", "Don't have an account yet?")}{" "}
              <Link as={RouterAstryxLink} href="/signup">
                {t("login.createAccount", "Create an account")}
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Card>
    </Center>
  )
}
