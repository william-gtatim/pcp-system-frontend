import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

export const planningKey = ['planning'] as const;

export type ProductionPlanning = {
    totalRevenue: number;
    name: string;
    price: number;
    quantity: number;
};

export function useProductsQuery() {
    return useQuery({
        queryKey: planningKey,
        queryFn: () => apiClient.get<ProductionPlanning[]>('/production-planing'),
    });
}