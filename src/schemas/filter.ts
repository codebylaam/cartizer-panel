import z from 'zod'

export const filterSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  min_price: z.number().min(0).optional(),
  max_price: z.number().min(0).optional(),
  search: z.string().optional(),
  category_id: z.string().optional(),
  brand_id: z.string().optional(),
  sort_by: z.enum(['price', 'created_at', 'title']).optional(),
  sort_order: z.enum(['asc', 'desc']).optional(),
})

export type FilterParams = z.infer<typeof filterSchema>

export const customerFilterSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(),
  sort_by: z.enum(['name', 'email', 'phone', 'created_at']).optional(),
  sort_order: z.enum(['asc', 'desc']).optional(),
})

export type CustomerFilterParams = z.infer<typeof customerFilterSchema>
