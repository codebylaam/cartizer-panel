import * as z from 'zod'
import { t } from 'i18next'

export const CreateCategorySchema = z.intersection(
  z.object({
    name: z
      .string(t('create.category.validation.name.required'))
      .min(3, t('create.category.validation.name.min'))
      .max(100, t('create.category.validation.name.max')),
    slug: z
      .string(t('create.category.validation.slug.required'))
      .min(3, t('create.category.validation.slug.min'))
      .max(100, t('create.category.validation.slug.max')),
    description: z
      .string(t('create.category.validation.description.required'))
      .min(10, t('create.category.validation.description.min')),
  }),
  z.discriminatedUnion('mode', [
    z.object({
      mode: z.literal('create'),
    }),
    z.object({
      mode: z.literal('update'),
      id: z.uuid(t('category.validation.id.required')),
    }),
  ]),
)
export type CreateCategoryT = z.infer<typeof CreateCategorySchema>
export type CategoryT = z.infer<typeof CreateCategorySchema> & {
  id: string
  created_at: string
  updated_at: string
}
