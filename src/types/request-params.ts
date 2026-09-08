export type GetTableDataPayload = {
  page?: number
  limit?: number
  min_price?: number
  max_price?: number
  search?: string
  category_id?: string
  brand_id?: string
  sort_by?: 'price' | 'createdAt'
  sort_order?: 'asc' | 'desc'
}
