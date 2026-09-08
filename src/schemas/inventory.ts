import * as z from 'zod'

export const InventorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  stock_quantity: z.number(),
  price: z.union([z.string(), z.number()]),
  sku: z.string().optional().default(''),
})

export type InventoryT = z.infer<typeof InventorySchema>
