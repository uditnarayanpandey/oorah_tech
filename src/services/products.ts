import type { Product } from '../types';
import { products } from '../data/products';

export const fetchProducts = async (): Promise<Product[]> => products;
