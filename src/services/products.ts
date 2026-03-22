import type { Product } from '../types'
import { createApi } from './api'

const PRODUCTS_BASE_URL =
  import.meta.env.VITE_PRODUCTS_API_URL || import.meta.env.VITE_API_URL || '/api'

const productsApi = createApi(PRODUCTS_BASE_URL)

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await productsApi.get<Product[]>('/products')
  return response.data
}
