import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../services/products.service';
import { Food, FoodCategory } from '../types';

const PRODUCTS_QUERY_KEY = ['products'] as const;

export function useAllFoods() {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, 'all'],
    queryFn: () => productsApi.getAllFoods(),
  });
}

export function useFoodsByCategory(category: FoodCategory) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, 'category', category],
    queryFn: () => productsApi.getFoodsByCategory(category),
  });
}

export function useFoodById(id: string) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, 'detail', id],
    queryFn: () => productsApi.getFoodById(id),
  });
}

export function useSearchFoods(query: string) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, 'search', query],
    queryFn: () => productsApi.searchFoods(query),
    enabled: query.length > 0,
  });
}

export function useFeaturedFoods() {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, 'featured'],
    queryFn: () => productsApi.getFeaturedFoods(),
  });
}
