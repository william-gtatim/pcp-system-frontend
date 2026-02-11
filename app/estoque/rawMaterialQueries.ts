import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

export const rawMaterialKey = ['raw-materials'] as const;

export type RawMaterialType = {
    id: number;
    code: string;
    name: string;
    stockQuantity: number;
};

export function useRawMaterialsQuery() {
    return useQuery({
        queryKey: rawMaterialKey,
        queryFn: () => apiClient.get<RawMaterialType[]>('/raw-materials'),
    });
}