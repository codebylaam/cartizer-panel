import { useTranslation } from "react-i18next"
import { useToast } from "@astryxdesign/core"
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog"
import { Layout, LayoutContent } from "@astryxdesign/core/Layout"
import { FormLayout } from "@astryxdesign/core/FormLayout"
import { HStack } from "@astryxdesign/core/HStack"
import { Button } from "@astryxdesign/core/Button"

import { createCategoryFormOpt } from "../create/create-category-opt"
import { useAppForm } from "@/components/generic-inputs/field-context"
import { useReactMutation } from "@/hooks/use-query"
import type { CreateCategoryT } from "@/schemas/category"

type CreateCategoryModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateCategoryModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateCategoryModalProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const createCategoryMutation = useReactMutation<CreateCategoryT, null>({
    url: "/category/create",
  })

  const form = useAppForm({
    ...createCategoryFormOpt,
    onSubmit: ({ value }) => {
      createCategoryMutation.mutate(value, {
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
            title={t("create.category.heading", "Create Category")}
            subtitle={t(
              "create.category.description",
              "Enter category information to add it to your store.",
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
                <form.AppField
                  name="name"
                  listeners={{
                    onChangeDebounceMs: 500,
                    onChange: ({ value }) => {
                      const slug = value
                        .toLowerCase()
                        .replace(/ /g, "-")
                        .replace(/[^a-z0-9-]/g, "")
                      form.setFieldValue("slug", slug)
                    },
                  }}
                >
                  {(field) => (
                    <field.GenericInput
                      isRequired
                      label={t("create.category.form.name.label", "Name")}
                      placeholder={t(
                        "create.category.form.name.placeholder",
                        "e.g. Electronics",
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="slug">
                  {(field) => (
                    <field.GenericInput
                      isRequired
                      label={t("create.category.form.slug.label", "Slug")}
                      placeholder={t(
                        "create.category.form.slug.placeholder",
                        "e.g. electronics",
                      )}
                    />
                  )}
                </form.AppField>

                <form.AppField name="description">
                  {(field) => (
                    <field.GenericTextarea
                      isRequired
                      label={t(
                        "create.category.form.description.label",
                        "Description",
                      )}
                      placeholder={t(
                        "create.category.form.description.placeholder",
                        "e.g. Phones, laptops and accessories.",
                      )}
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
                        label={t("create.category.submit", "Create Category")}
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
