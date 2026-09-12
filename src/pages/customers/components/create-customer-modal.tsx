import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useToast } from "@astryxdesign/core"
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog"
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput"
import { Layout, LayoutContent } from "@astryxdesign/core/Layout"
import { FormLayout } from "@astryxdesign/core/FormLayout"
import { HStack } from "@astryxdesign/core/HStack"
import { VStack } from "@astryxdesign/core/VStack"
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

type AddressPrefix = "shipping_address" | "billing_address"

const emptyAddress = {
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "BGD",
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
  const [includedAddresses, setIncludedAddresses] = useState({
    shipping_address: false,
    billing_address: false,
  })

  const form = useAppForm({
    ...createCustomerFormOpt,
    onSubmit: ({ value }) => {
      createCustomerMutation.mutate(value, {
        onSuccess: (response) => {
          toast({
            body: t(response.message),
          })
          form.reset()
          setIncludedAddresses({
            shipping_address: false,
            billing_address: false,
          })
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

  function toggleAddress(prefix: AddressPrefix, checked: boolean) {
    setIncludedAddresses((prev) => ({ ...prev, [prefix]: checked }))
    if (prefix === "shipping_address") {
      form.setFieldValue(
        "shipping_address",
        checked ? { ...emptyAddress } : undefined,
      )
    } else {
      form.setFieldValue(
        "billing_address",
        checked ? { ...emptyAddress } : undefined,
      )
    }
  }

  function renderAddressFields(prefix: AddressPrefix) {
    return (
      <VStack gap={3}>
        <form.AppField name={`${prefix}.address_1` as const}>
          {(field) => (
            <field.GenericInput
              isRequired
              label={t(
                `create.customer.form.${prefix}.address_1.label`,
                "Address Line 1",
              )}
              placeholder={t(
                `create.customer.form.${prefix}.address_1.placeholder`,
                "House, road, area",
              )}
            />
          )}
        </form.AppField>

        <form.AppField name={`${prefix}.address_2` as const}>
          {(field) => (
            <field.GenericInput
              isOptional
              label={t(
                `create.customer.form.${prefix}.address_2.label`,
                "Address Line 2",
              )}
              placeholder={t(
                `create.customer.form.${prefix}.address_2.placeholder`,
                "Apartment, landmark",
              )}
            />
          )}
        </form.AppField>

        <HStack gap={3}>
          <form.AppField name={`${prefix}.city` as const}>
            {(field) => (
              <field.GenericInput
                isRequired
                label={t(
                  `create.customer.form.${prefix}.city.label`,
                  "City",
                )}
              />
            )}
          </form.AppField>

          <form.AppField name={`${prefix}.state` as const}>
            {(field) => (
              <field.GenericInput
                isRequired
                label={t(
                  `create.customer.form.${prefix}.state.label`,
                  "State / Division",
                )}
              />
            )}
          </form.AppField>
        </HStack>

        <HStack gap={3}>
          <form.AppField name={`${prefix}.postal_code` as const}>
            {(field) => (
              <field.GenericInput
                isRequired
                label={t(
                  `create.customer.form.${prefix}.postal_code.label`,
                  "Postal Code",
                )}
              />
            )}
          </form.AppField>

          <form.AppField name={`${prefix}.country` as const}>
            {(field) => (
              <field.GenericInput
                isOptional
                label={t(
                  `create.customer.form.${prefix}.country.label`,
                  "Country",
                )}
              />
            )}
          </form.AppField>
        </HStack>
      </VStack>
    )
  }

  return (
    <Dialog isOpen={open} onOpenChange={onOpenChange} width={560} purpose="form">
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
                      isOptional
                      type="password"
                      label={t(
                        "create.customer.form.password.label",
                        "Password",
                      )}
                      description={t(
                        "create.customer.form.password.description",
                        "Optional. The account stays unclaimed until the customer registers.",
                      )}
                      placeholder="••••••••"
                    />
                  )}
                </form.AppField>

                <VStack gap={3}>
                  <CheckboxInput
                    label={t(
                      "create.customer.form.shipping_address.toggle",
                      "Add a shipping address",
                    )}
                    value={includedAddresses.shipping_address}
                    onChange={(checked) =>
                      toggleAddress("shipping_address", checked)
                    }
                  />
                  {includedAddresses.shipping_address &&
                    renderAddressFields("shipping_address")}
                </VStack>

                <VStack gap={3}>
                  <CheckboxInput
                    label={t(
                      "create.customer.form.billing_address.toggle",
                      "Add a billing address",
                    )}
                    value={includedAddresses.billing_address}
                    onChange={(checked) =>
                      toggleAddress("billing_address", checked)
                    }
                  />
                  {includedAddresses.billing_address &&
                    renderAddressFields("billing_address")}
                </VStack>

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
