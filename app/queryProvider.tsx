'use client'

import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
    MutationCache,
} from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

export default function QueryProvider({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (error: any) => {
                        showErrorToast(error)
                    },
                }),
                mutationCache: new MutationCache({
                    onError: (error: any) => {
                        showErrorToast(error)
                    },
                }),
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

function showErrorToast(error: any) {
    if (!error) return

    if (error.errors?.length) {
        error.errors.forEach((e: any) => {
            toast.error(e.message)
        })
        return
    }

    toast.error(error.title ?? 'Erro inesperado')
}