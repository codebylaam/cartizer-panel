import type { CreateProductT } from '@/schemas/product'
import type { GetTableDataPayload } from '@/types/request-params'
import { ApiService } from '@/services/api'

export type CreateProductPayload = Omit<
  CreateProductT,
  'images' | 'is_active'
> & {
  images: Array<string>
  is_active: boolean
}

export type Product = CreateProductT & { id: string }
export type GetProductsPayload = GetTableDataPayload

export type CreateProductResponse = CreateProductT & { id: string }

class ProductServiceClass {
  createProduct(product: CreateProductPayload) {
    const response = ApiService.post<CreateProductResponse>({
      url: '/product',
      payload: product,
    })
    return response
  }

  getProduct(id: string) {
    const response = ApiService.get<Product>({
      url: `/product/${id}`,
    })
    return response
  }

  async getProducts(payload: GetProductsPayload) {
    const response = ApiService.get<Array<Product>>({
      url: '/product/list',
      config: {
        params: payload,
        headers: { 'User-Agent': 'Apple MacBook Air' },
      },
    })
    return response
  }
}

export const ProductService = new ProductServiceClass()
