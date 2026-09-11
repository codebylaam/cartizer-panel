import { useTranslation } from "react-i18next"
import { useToast } from "@astryxdesign/core"
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog"
import { Layout, LayoutContent } from "@astryxdesign/core/Layout"
import { FormLayout } from "@astryxdesign/core/FormLayout"
import { HStack } from "@astryxdesign/core/HStack"
import { Button } from "@astryxdesign/core/Button"

import { createCustomerFormOpt } from "../create/create-customer-opt"
import { useAppForm } from "@/components/generic-inputs/field-context"
import { useReactMutation } from "@/hooks/use-query"
import type { CreateCustomerPayloadT } from "@/schemas/customer"

type CreateCustomerModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateCustomerModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateCustomerModalProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const createCustomerMutation = useReactMutation<CreateCustomerPayloadT, null>(
    {
      url: "/customer/create",
    },
  )

  const form = useAppForm({
    ...createCustomerFormOpt,
    onSubmit: ({ value }) => {
      createCustomerMutation.mutate(value, {
        onSuccess: (response) => {
          toast({
            body: t(response.message),
          })
          form.reset()
          onOpenChange(false)
          onSuccess?.()
        },
        onError: (error) => {
          toast({
            body: t(error.message),
            type: "error",
          })
        },
      })
    },
  })

  return (
    <Dialog isOpen={open} onOpenChange={onOpenChange} width={480} purpose="form">
      <Layout
        header={
          <DialogHeader
            title={t("create.customer.heading", "Create Customer")}
            subtitle={t(
              "create.customer.description",
              "Enter customer information to add them to your store.",
            )}
            onOpenChange={onOpenChange}
          />
        }
        content={
          <LayoutContent>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                form.handleSubmit()
              }}
            >
              <FormLayout direction="vertical">
                <form.AppField name="name">
                  {(field) => (
                    <field.GenericInput
                      isRequired
                      label={t("create.customer.form.name.label", "Full Name")}
                      placeholder={t(
                        "create.customer.form.name.placeholder",
                        "e.g. John Doe",
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="email">
                  {(field) => (
                    <field.GenericInput
                      isRequired
                      type="email"
                      label={t(
                        "create.customer.form.email.label",
                        "Email Address",
                      )}
                      placeholder={t(
                        "create.customer.form.email.placeholder",
                        "e.g. john@example.com",
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="phone">
                  {(field) => (
                    <field.GenericInput
                      isOptional
                      label={t(
                        "create.customer.form.phone.label",
                        "Phone Number",
                      )}
                      placeholder={t(
                        "create.customer.form.phone.placeholder",
                        "+8801912345678",
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="password">
                  {(field) => (
                    <field.GenericInput
                      isRequired
                      type="password"
                      label={t(
                        "create.customer.form.password.label",
                        "Password",
                      )}
                      placeholder="••••••••"
                    />
                  )}
                </form.AppField>

                <HStack gap={2} justify="end">
                  <Button
                    label={t("table_global.cancel")}
                    type="button"
                    variant="secondary"
                    onClick={() => onOpenChange(false)}
                  />
                  <form.Subscribe>
                    {({ isSubmitting }) => (
                      <Button
                        label={t("create.customer.submit", "Create Customer")}
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                      />
                    )}
                  </form.Subscribe>
                </HStack>
              </FormLayout>
            </form>
          </LayoutContent>
        }
      />
    </Dialog>
  )
}
