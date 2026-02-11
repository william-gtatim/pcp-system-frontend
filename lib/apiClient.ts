export type ApiErrorDetail = {
    field: string;
    message: string;
};

export type ApiError = {
    status: number;
    title: string;
    errors: ApiErrorDetail[];
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

if(!BASE_URL){
    alert("A url do servidor não está defina na variável de ambiente")
}

async function request<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${BASE_URL}${url}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        let apiError: ApiError = {
            status: response.status,
            title: 'Erro inesperado',
            errors: [],
        };

        try {
            const data = await response.json();

            apiError = {
                status: response.status,
                title: data.title ?? apiError.title,
                errors: Array.isArray(data.errors) ? data.errors : [],
            };
        } catch {
        }

        throw apiError;
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

export const apiClient = {
    get: <T>(url: string) =>
        request<T>(url),

    post: <T>(url: string, body: unknown) =>
        request<T>(url, {
            method: 'POST',
            body: JSON.stringify(body),
        }),

    put: <T>(url: string, body: unknown) =>
        request<T>(url, {
            method: 'PUT',
            body: JSON.stringify(body),
        }),

    patch: <T>(url: string, body: unknown) =>
        request<T>(url, {
            method: 'PATCH',
            body: JSON.stringify(body),
        }),

    delete: <T>(url: string) =>
        request<T>(url, {
            method: 'DELETE',
        }),
};