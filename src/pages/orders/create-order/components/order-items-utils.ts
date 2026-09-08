import type { ProductT } from '@/schemas/product'
import type { OrderedVariantOptionPayload } from '@/schemas/order'

// Helper to safely extract image URL across images, medias, and media properties
export function getProductImageUrl(
  product?: ProductT | null,
): string | undefined {
  if (!product) return undefined
  if (Array.isArray(product.images) && product.images.length > 0) {
    const first = product.images[0]
    if (typeof first === 'string') return first
    if (first.url) return first.url
  }
  const anyProd = product
  if (Array.isArray(anyProd.medias) && anyProd.medias.length > 0) {
    const first = anyProd.medias[0]
    if (typeof first === 'string') return first
    if (first.url) return first.url
  }

  return undefined
}

// Compute total unit price of a product with its currently selected variant extra prices
export function computeItemUnitPrice(
  product: ProductT,
  selectedVariants?: Array<OrderedVariantOptionPayload>,
): number {
  let price = Number(product.price || 0)
  if (selectedVariants && Array.isArray(selectedVariants)) {
    selectedVariants.forEach((v) => {
      if (v.extra_price) {
        price += Number(v.extra_price)
      }
    })
  }
  return price
}
