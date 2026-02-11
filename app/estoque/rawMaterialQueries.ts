import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import type { RawMaterialType} from "@/app/estoque/rawMaterialTypes";

export const rawMaterialKey = ['raw-materials'] as const;

export function useRawMaterialsQuery() {
    return useQuery({
        queryKey: rawMaterialKey,
        queryFn: () => apiClient.get<RawMaterialType[]>('/raw-materials'),
    });
}