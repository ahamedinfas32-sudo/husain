import { Product } from '../types';
import { PRODUCTS } from '../data/products';

const STORAGE_KEY = 'hifa_custom_products_v2';

export const getStoredProducts = (): Product[] => {
  if (typeof window === 'undefined') return PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return PRODUCTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return PRODUCTS;
  } catch (err) {
    console.error('Failed to load products from storage:', err);
    return PRODUCTS;
  }
};

export const saveStoredProducts = (products: Product[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products to storage:', err);
  }
};

export const resetToDefaultProducts = (): Product[] => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error(err);
    }
  }
  return PRODUCTS;
};
