import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import {ProductType} from "@/app/produtos/productQueries";
import { productKey } from "@/app/produtos/productQueries";
import {planningKey} from "@/app/planning/planningQueries";

export type ProductCompositionDTO = {
    rawMaterialId: number
    quantityRequired: number
}
export type ProductDTO = {
    name: string;
    price: number;
    composition: ProductCompositionDTO[];
}


export function useCreateProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ProductDTO) =>
            apiClient.post<ProductType>('/products', data),

        onSuccess: (created) => {
            queryClient.invalidateQueries({ queryKey: planningKey })
            queryClient.setQueryData<ProductType[]>(
                productKey,
                old => old ? [created, ...old] : [created]
            );
        },
    });
}

export function useUpdateProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: ProductDTO }) =>
            apiClient.put<ProductType>(`/products/${id}`, data),

        onSuccess: (updated) => {
            queryClient.invalidateQueries({ queryKey: planningKey })
            queryClient.setQueryData<ProductType[]>(
                productKey,
                old =>
                    old
                        ? old.map(item =>
                            item.id === updated.id
                                ? { ...item, ...updated }
                                : item
                        )
                        : []
            );
        },
    });
}

export function useDeleteProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            apiClient.delete<void>(`/products/${id}`),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: planningKey })
            queryClient.setQueryData<ProductType[]>(
                productKey,
                old => old ? old.filter(item => item.id !== id) : []
            );
        },
    });
}