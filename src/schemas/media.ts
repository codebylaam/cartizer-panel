import * as z from 'zod'
import { t } from 'i18next'

export const CreateMediaSchema = z.object({
  id: z.uuid(t('create.media.validation.id.required')),
  name: z
    .string(t('create.media.validation.name.required'))
    .min(3, t('create.media.validation.name.min'))
    .max(100, t('create.media.validation.name.max')),
  size: z
    .string(t('create.media.validation.file.required'))
    .min(10, t('create.media.validation.file.min')),
  mime_type: z.string(),
  url: z.url(t('create.media.validation.url.required')),
})

export type CreateMediaT = z.infer<typeof CreateMediaSchema>

export type MediaT = CreateMediaT & {
  created_at: string
  updated_at: string
}
