import { Text } from "@astryxdesign/core/Text"
import { Card } from "@astryxdesign/core/Card"
import { FormLayout } from "@astryxdesign/core/FormLayout"
import { Layout, LayoutContent, LayoutHeader } from "@astryxdesign/core/Layout"

import { createProductFormOpt } from "../create-product-opt"
import { withForm } from "@/components/generic-inputs/field-context"
import { useTranslation } from "react-i18next"

const Basic = withForm({
  ...createProductFormOpt,
  render: function ({ form }) {
    const { t } = useTranslation()
    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">{t("create.product.form.basic")}</Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout>
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
                      label={t("create.product.form.name.label")}
                      placeholder={t("create.product.form.name.placeholder")}
                      description={t("create.product.form.name.description")}
                    />
                  )}
                </form.AppField>

                <form.AppField name="slug">
                  {(field) => (
                    <field.GenericInput
                      isRequired
                      label={t("create.product.form.slug.label")}
                      placeholder={t("create.product.form.slug.placeholder")}
                      description={t("create.product.form.slug.description")}
                    />
                  )}
                </form.AppField>

                <form.AppField
                  name="description"
                  children={(field) => (
                    <field.GenericRichTextEditor
                      isRequired
                      placeholder={t(
                        "create.product.form.description.placeholder",
                      )}
                      label={t("create.product.form.description.label")}
                      description={t(
                        "create.product.form.description.description",
                      )}
                    />
                  )}
                />

                <form.AppField name="short_description">
                  {(field) => (
                    <field.GenericTextarea
                      label={t("create.product.form.short_description.label")}
                      placeholder={t(
                        "create.product.form.short_description.placeholder",
                      )}
                      description={t(
                        "create.product.form.short_description.description",
                      )}
                    />
                  )}
                </form.AppField>
              </FormLayout>
            </LayoutContent>
          }
        />
      </Card>
    )
  },
})

export default Basic
