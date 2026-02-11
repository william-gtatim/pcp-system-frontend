import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { RawMaterialType } from "@/app/estoque/rawMaterialQueries";
import {rawMaterialKey} from "@/app/estoque/rawMaterialQueries";

type RawMaterialDTO = Omit<RawMaterialType, "id" | "code">


export function useCreateRawMaterialMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RawMaterialDTO) =>
            apiClient.post<RawMaterialType>('/raw-materials', data),
        onSuccess: (created) => {
            queryClient.setQueryData<RawMaterialType[]>(
                rawMaterialKey,
                old => old ? [created, ...old] : [created]
            );
        },
    });
}

export function useUpdateRawMaterialMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: RawMaterialDTO }) =>
            apiClient.put<RawMaterialType>(`/raw-materials/${id}`, data),
        onSuccess: (updated) => {
            queryClient.setQueryData<RawMaterialType[]>(
                rawMaterialKey,
                old =>
                    old
                        ? old.map(item =>
                            item.id === updated.id ? updated : item
                        )
                        : []
            );
        },
    });
}

export function useDeleteRawMaterialMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            apiClient.delete<void>(`/raw-materials/${id}`),
        onSuccess: (_, id) => {
            queryClient.setQueryData<RawMaterialType[]>(
                rawMaterialKey,
                old => old ? old.filter(item => item.id !== id) : []
            );
        },
    });
}