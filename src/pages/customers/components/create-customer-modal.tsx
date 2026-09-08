import { useTranslation } from "react-i18next"

import { createCustomerFormOpt } from "../create/create-customer-opt"
import { useAppForm } from "@/components/generic-inputs/field-context"
import { ToasterService } from "@/services/toaster"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useReactMutation } from "@/hooks/use-query"

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
  const createCustomerMutation = useReactMutation({
    url: "customer/create",
  })

  const form = useAppForm({
    ...createCustomerFormOpt,
    onSubmit: async ({ value }) => {
      try {
        const response = await createCustomerMutation.mutateAsync({
          data: value,
        })
        ToasterService.success(response.message, t)
        form.reset()
        onOpenChange(false)
        onSuccess?.()
      } catch (err) {
        ToasterService.handleError(err, t)
      }
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("create.customer.heading", "Create Customer")}
          </DialogTitle>
          <DialogDescription>
            {t(
              "create.customer.description",
              "Enter customer information to add them to your store.",
            )}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="flex flex-col gap-4 mt-2"
        >
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
                label={t("create.customer.form.email.label", "Email Address")}
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
                label={t("create.customer.form.phone.label", "Phone Number")}
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
                label={t("create.customer.form.password.label", "Password")}
                placeholder="••••••••"
              />
            )}
          </form.AppField>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("common.cancel", "Cancel")}
            </Button>
            <form.Subscribe>
              {({ isValid, isSubmitting }) => (
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={!isValid}
                >
                  {t("create.customer.submit", "Create Customer")}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
