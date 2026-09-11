import type { CreateCategoryT } from '@/schemas/category'

export const createCategoryDefaultValue: CreateCategoryT = {
  mode: 'create',
  name: '',
  slug: '',
  description: '',
}
