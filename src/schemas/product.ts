import * as z from "zod"
import {
  PRODUCT_CONDITION,
  PRODUCT_STATUS,
} from "@/pages/products/create/constant"

export const ProductVariantOptionSchema = z.object({
  attribute: z.string(),
  extra_price: z.coerce.number<number>(),
  stock_quantity: z.coerce.number<number>().optional(),
  stock: z.coerce.number<number>().optional(),
  image_url: z.string().optional(),
  media_id: z.string().optional(),
})

export const ProductVariantSchema = z.object({
  title: z.string(),
  is_mandatory: z.boolean(),
  options: z.array(ProductVariantOptionSchema),
})

export type ProductVariantOptionPayload = z.infer<
  typeof ProductVariantOptionSchema
>
export type ProductVariantPayload = z.infer<typeof ProductVariantSchema>

export const ProductMutationSchema = z.intersection(
  z.object({
    name: z
      .string("create.product.validation.name.required")
      .min(10, "create.product.validation.name.min")
      .max(100, "create.product.validation.name.max"),
    slug: z
      .string("create.product.validation.slug.required")
      .min(10, "create.product.validation.slug.min")
      .max(100, "create.product.validation.slug.max"),
    description: z
      .string("create.product.validation.description.required")
      .min(10, "create.product.validation.description.min"),
    short_description: z
      .string("create.product.validation.short_description.required")
      .min(10, "create.product.validation.short_description.min")
      .max(200, "create.product.validation.short_description.max")
      .nullable(),
    medias: z
      .array(
        z.object({
          id: z.string(),
          url: z.string().optional(),
        }),
      )
      .min(1, "create.product.validation.images.one_is_required"),
    specifications: z.array(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    ),
    variants: z.array(ProductVariantSchema),
    category_ids: z.array(z.string()).optional(),
    price: z.coerce.number<number>("create.product.validation.price.required"),
    purchase_price: z.coerce.number<number>().optional(),
    regular_price: z.coerce.number<number>().optional(),

    serial: z.string(),
    sku: z.string(),
    stock_quantity: z.coerce.number<number>(),
    status: z.enum([PRODUCT_STATUS.ACTIVE, PRODUCT_STATUS.INACTIVE]),
    condition: z.enum([
      PRODUCT_CONDITION.NEW,
      PRODUCT_CONDITION.USED,
      PRODUCT_CONDITION.REFURBISHED,
    ]),
  }),
  z.discriminatedUnion("mode", [
    z.object({
      mode: z.literal("create"),
    }),
    z.object({
      mode: z.literal("update"),
      id: z.uuid("product.validation.id.required"),
    }),
  ]),
)
export type CreateProductMutationT = z.infer<typeof ProductMutationSchema>
export type ProductT = z.infer<typeof ProductMutationSchema> & {
  id: string
  images: Array<{ id: string; url: string }>
  created_at: string
  update_at: string
}

export type CreateProductPayloadT = Omit<
  CreateProductMutationT,
  "mode" | "id" | "medias"
> & {
  media_ids: Array<string>
}

export type UpdateProductPayloadT = Omit<
  CreateProductMutationT,
  "mode" | "id" | "medias"
> & {
  media_ids: Array<string>
}
