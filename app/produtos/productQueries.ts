import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

export const productKey = ['products'] as const;

export type ProductCompositionType = {
    id: number;
    rawMaterialId: number;
    rawMaterialName: string;
    quantityRequired: number;
}

export type ProductType = {
    id: number;
    code: string;
    name: string;
    price: number;
    composition: ProductCompositionType[];
};

export function useProductsQuery() {
    return useQuery({
        queryKey: productKey,
        queryFn: () => apiClient.get<ProductType[]>('/products'),
    });
}