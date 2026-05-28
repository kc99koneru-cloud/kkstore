import { useCallback } from 'react';
import { productApi } from '../services/api.js';
import { useFetch } from './useFetch.js';

export function useProducts(filters) {
  const fetcher = useCallback(() => productApi.getProducts(filters), [filters]);
  return useFetch(fetcher);
}
