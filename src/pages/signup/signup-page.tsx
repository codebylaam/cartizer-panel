import { useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useNavigate } from '@tanstack/react-router'
import { StorefrontIcon } from '@phosphor-icons/react/ssr'

import {
  Button,
  Card,
  Center,
  Heading,
  HStack,
  Icon,
  Link,
  NavIcon,
  Step,
  Stepper,
  Text,
  VStack,
  useToast,
} from '@astryxdesign/core'

import { signupFormOpt } from './signup-opt'
import ShopStep from './components/shop-step'
import PersonalStep from './components/personal-step'
import SecurityStep from './components/security-step'
import {
  SIGNUP_STEP_FIELDS,
  SIGNUP_STEP_SCHEMAS,
} from './signup.zod'
import { useReactMutation } from '@/hooks/use-query'
import { useAppForm } from '@/components/generic-inputs/field-context'

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  backgroundColor: 'var(--color-background-body)',
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

export default function SignupPage() {
  const { t } = useTranslation()
  const toast = useToast()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const signupMutation = useReactMutation({
    url: 'auth/seller/register',
  })

  const form = useAppForm({
    ...signupFormOpt,
    onSubmit: ({ value }) => {
      // `confirm_password` is client-side only — the API takes the six
      // register fields and derives the storefront domain from `shop_name`.
      const payload = {
        first_name: value.first_name,
        last_name: value.last_name,
        email: value.email,
        phone: value.phone,
        password: value.password,
        shop_name: value.shop_name,
      }

      signupMutation.mutate(payload, {
        onSuccess: (data) => {
          toast({ body: t(data.message) })
          navigate({ to: '/dashboard' })
        },
        onError: (error) => {
          toast({ body: t(error.message), type: 'error' })
        },
      })
    },
  })

  const isLastStep = step === SIGNUP_STEP_FIELDS.length - 1

  /**
   * Validates one wizard step and writes the outcome onto its fields so the
   * inputs render it. TanStack Form's own submit slot (`onSubmit`) is reused
   * for the errors so the library and this code never disagree about a field.
   */
  const validateStep = (index: number) => {
    const result = SIGNUP_STEP_SCHEMAS[index].safeParse(form.state.values)

    const messagesByField = new Map<string, Array<string>>()
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = String(issue.path[0] ?? '')
        if (!field) continue
        messagesByField.set(field, [
          ...(messagesByField.get(field) ?? []),
          issue.message,
        ])
      }
    }

    for (const name of SIGNUP_STEP_FIELDS[index]) {
      const messages = messagesByField.get(name) ?? []
      form.setFieldMeta(name, (prev) => ({
        ...prev,
        isTouched: true,
        errorMap: {
          ...prev.errorMap,
          onSubmit: messages.length > 0 ? messages : undefined,
        },
      }))
    }

    return result.success
  }

  const goToNextStep = () => {
    if (!validateStep(step)) return
    setStep((current) => Math.min(current + 1, SIGNUP_STEP_FIELDS.length - 1))
  }

  const goToPreviousStep = () => {
    setStep((current) => Math.max(current - 1, 0))
  }

  const submitForm = async () => {
    // Steps can only be passed forwards, but re-check them all so a submit can
    // never dead-end on an error the user cannot see.
    for (let index = 0; index < SIGNUP_STEP_FIELDS.length; index += 1) {
      if (!validateStep(index)) {
        setStep(index)
        return
      }
    }

    await form.handleSubmit()
  }

  // The submit button doubles as "Next" until the last step, so Enter inside a
  // field advances the wizard instead of registering early.
  const handleFormSubmit = () => {
    if (isLastStep) {
      void submitForm()
      return
    }

    goToNextStep()
  }

  return (
    <Center axis="both" padding={4} style={pageStyle}>
      <Card padding={8} width="100%" maxWidth={520} elevation="med">
        <VStack gap={6} hAlign="stretch">
          {/* Header Branding */}
          <VStack gap={2} hAlign="center">
            <NavIcon
              icon={<Icon icon={StorefrontIcon} size="lg" color="accent" />}
            />
            <Heading level={2} justify="center">
              {t('signup.title', 'Create your seller account')}
            </Heading>
            <Text type="body" color="secondary" size="sm" justify="center">
              {t(
                'signup.description',
                'Set up your storefront in a few quick steps',
              )}
            </Text>
          </VStack>

          <Stepper
            activeStep={step}
            onStepClick={(index) => {
              if (index < step) setStep(index)
            }}
          >
            <Step
              step={0}
              label={t('signup.step.personal', 'Personal')}
              description={t('signup.step.personal_description', 'Your details')}
            />
            <Step
              step={1}
              label={t('signup.step.shop', 'Shop')}
              description={t('signup.step.shop_description', 'Storefront')}
            />
            <Step
              step={2}
              label={t('signup.step.security', 'Security')}
              description={t('signup.step.security_description', 'Password')}
            />
          </Stepper>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              event.stopPropagation()
              handleFormSubmit()
            }}
          >
            <VStack gap={6} hAlign="stretch">
              {step === 0 && <PersonalStep form={form} />}
              {step === 1 && <ShopStep form={form} />}
              {step === 2 && <SecurityStep form={form} />}

              <HStack gap={2} justify={step > 0 ? 'between' : 'end'}>
                {step > 0 && (
                  <Button
                    label={t('signup.back', 'Back')}
                    type="button"
                    variant="secondary"
                    onClick={goToPreviousStep}
                  />
                )}

                <form.Subscribe
                  selector={(state) => ({
                    isSubmitting: state.isSubmitting,
                  })}
                >
                  {({ isSubmitting }) => (
                    <Button
                      label={
                        isLastStep
                          ? t('signup.submit', 'Create Account')
                          : t('signup.next', 'Next')
                      }
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                    />
                  )}
                </form.Subscribe>
              </HStack>
            </VStack>
          </form>

          {/* Footer Navigation Link */}
          <VStack hAlign="center" gap={1}>
            <Text type="supporting" color="secondary">
              {t('signup.haveAccount', 'Already have an account?')}{' '}
              <Link as={RouterAstryxLink} href="/login">
                {t('signup.signIn', 'Sign in')}
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Card>
    </Center>
  )
}
