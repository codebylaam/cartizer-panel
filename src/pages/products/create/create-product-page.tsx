import { useToast } from "@astryxdesign/core"
import { useTranslation } from "react-i18next"
import { Button } from "@astryxdesign/core/Button"
import { VStack } from "@astryxdesign/core/VStack"
import { Heading } from "@astryxdesign/core/Heading"
import { Grid, GridSpan } from "@astryxdesign/core/Grid"
import { FormLayout } from "@astryxdesign/core/FormLayout"

import Basic from "./components/basic"
import Media from "./components/media"
import Pricing from "./components/pricing"
import Variants from "./components/variants"
import Inventory from "./components/inventory"
import Specification from "./components/specification"
import { Route } from "@/routes/_authenticated/products/$id"
import { useReactMutation, useReactQuery } from "@/hooks/use-query"
import { useAppForm } from "@/components/generic-inputs/field-context"
import type { CreateProductMutationT, ProductT } from "@/schemas/product"
import { getProductStatusOptions } from "@/pages/products/create/constant"
import { createProductFormOpt } from "@/pages/products/create/create-product-opt"
import type { CategoryT } from "@/schemas/category"
import { CategoryQueryKeys } from "@/constants/query-keys"

export default function CreateProductPage() {
  const { t } = useTranslation()
  const { id } = Route.useParams()
  const navigate = Route.useNavigate()
  const { product } = Route.useLoaderData()
  const toast = useToast()

  const categoriesQuery = useReactQuery<CategoryT, true>({
    queryKey: CategoryQueryKeys.lists(),
    url: "/category/list",
  })

  const createProductMutation = useReactMutation<
    CreateProductMutationT,
    ProductT
  >({
    url: "/product/create",
  })
  const updateProductMutation = useReactMutation<
    CreateProductMutationT,
    ProductT
  >({
    url: "/product/update",
    method: "PUT",
  })

  console.log(categoriesQuery.data)
  const categoryOptions = categoriesQuery.data
    ? categoriesQuery.data.data.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }))
    : []

  if (product) product.mode = "update"

  const form = useAppForm({
    ...createProductFormOpt,
    defaultValues: product ?? createProductFormOpt.defaultValues,
    onSubmit: ({ value }) => {
      if (id === "create" && value.mode === "create") {
        createProductMutation.mutate(value, {
          onSuccess: (data) => {
            toast({
              body: t(data.message),
            })
            navigate({ to: "/products" })
          },
          onError: (err) => {
            toast({
              body: t(err.message),
            })
          },
        })
      } else {
        updateProductMutation.mutate(value, {
          onSuccess: (data) => {
            toast({
              body: t(data.message),
            })
          },
          onError: (err) => {
            toast({
              body: t(err.message),
            })
          },
        })
      }
    },
  })

  return (
    <>
      <Heading level={1}>{t("create.product.heading")}</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit(e)
        }}
      >
        <Grid columns={12} gap={4} align="start">
          <GridSpan columns={8}>
            <VStack gap={3}>
              <Basic form={form} />
              <Media form={form} />
              <Pricing form={form} />
              <Inventory form={form} />
              <Variants form={form} />
              <Specification form={form} />
            </VStack>
          </GridSpan>

          <GridSpan
            columns={4}
            style={{
              position: "sticky",
              top: "1rem",
              alignSelf: "start",
              height: "fit-content",
            }}
          >
            <FormLayout>
              <form.AppField name="status">
                {(field) => (
                  <field.GenericSelect
                    label={t("create.product.form.status.label")}
                    options={getProductStatusOptions(t)}
                    description={t("create.product.form.status.description")}
                  />
                )}
              </form.AppField>
              <form.AppField name="category_ids">
                {(field) => (
                  <field.GenericMultiSelect
                    label={t("create.product.form.categories.label")}
                    options={categoryOptions}
                    description={t(
                      "create.product.form.categories.description",
                    )}
                    placeholder={t(
                      "create.product.form.categories.placeholder",
                    )}
                  />
                )}
              </form.AppField>
              <form.Subscribe>
                {({ isSubmitting }) => (
                  <Button
                    label="Create Product"
                    type="submit"
                    isLoading={isSubmitting}
                    variant="primary"
                  >
                    {t("create.product.submit")}
                  </Button>
                )}
              </form.Subscribe>
            </FormLayout>
          </GridSpan>
        </Grid>
      </form>
    </>
  )
}
