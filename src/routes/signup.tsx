import { useState, type CSSProperties } from "react"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
  useNavigate,
} from "@tanstack/react-router"
import {
  EnvelopeSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  PhoneIcon,
  StorefrontIcon,
  UserIcon,
} from "@phosphor-icons/react"

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

import { signupSchema } from "@/pages/signup/signup.zod"
import { useAppForm } from "@/components/generic-inputs/field-context"
import { useReactMutation } from "@/hooks/use-query"

export const Route = createFileRoute("/signup")({
  component: SignupPage,
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

function SignupPage() {
  const toast = useToast()
  const signupMutation = useReactMutation({
    url: "/api/auth/signup",
  })
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const form = useAppForm({
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await signupMutation.mutateAsync({ data: value })
        toast({
          body: result.message,
        })
        navigate({ to: "/login" })
      } catch (err: any) {
        toast({
          body: err.message,
          type: "error",
        })
      }
    },
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
    },
  })

  return (
    <Center axis="both" padding={4} style={pageStyle}>
      <Card padding={8} width="100%" maxWidth={440} elevation="med">
        <VStack gap={6} hAlign="stretch">
          {/* Header Branding */}
          <VStack gap={2} hAlign="center">
            <NavIcon
              icon={<Icon icon={StorefrontIcon} size="lg" color="accent" />}
            />
            <Heading level={2} justify="center">
              Create Account
            </Heading>
            <Text type="body" color="secondary" size="sm" justify="center">
              Sign up to start managing your store with Savizer
            </Text>
          </VStack>

          {/* Signup Form */}
          <form
            onSubmit={(event) => {
              event.preventDefault()
              event.stopPropagation()
              form.handleSubmit()
            }}
          >
            <FormLayout direction="vertical">
              {/* Name Fields Row */}
              <FormLayout direction="horizontal">
                <form.AppField name="first_name">
                  {(field) => (
                    <TextInput
                      label="First Name"
                      placeholder="John"
                      startIcon={UserIcon}
                      value={field.state.value}
                      onChange={(v) => field.handleChange(v)}
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

                <form.AppField name="last_name">
                  {(field) => (
                    <TextInput
                      label="Last Name"
                      placeholder="Doe"
                      startIcon={UserIcon}
                      value={field.state.value}
                      onChange={(v) => field.handleChange(v)}
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
              </FormLayout>

              {/* Email Field */}
              <form.AppField name="email">
                {(field) => (
                  <TextInput
                    type="email"
                    label="Email Address"
                    placeholder="john.doe@example.com"
                    startIcon={EnvelopeSimpleIcon}
                    value={field.state.value}
                    onChange={(v) => field.handleChange(v)}
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

              {/* Phone Field */}
              <form.AppField name="phone">
                {(field) => (
                  <TextInput
                    label="Phone Number"
                    placeholder="01XXXXXXXXX"
                    startIcon={PhoneIcon}
                    value={field.state.value}
                    onChange={(v) => field.handleChange(v)}
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
                    label="Password"
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
                      label="Password"
                      isLabelHidden
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      startIcon={LockKeyIcon}
                      value={field.state.value}
                      onChange={(v) => field.handleChange(v)}
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
                    label="Sign Up"
                    type="submit"
                    variant="primary"
                    width="100%"
                    isLoading={isSubmitting}
                  />
                )}
              </form.Subscribe>
            </FormLayout>
          </form>

          {/* Footer Navigation Link */}
          <VStack hAlign="center" gap={1}>
            <Text type="supporting" color="secondary">
              Already have an account?{" "}
              <Link as={RouterAstryxLink} href="/login">
                Sign in
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Card>
    </Center>
  )
}
