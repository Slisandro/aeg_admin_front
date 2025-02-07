import { useQuery } from 'react-query';

const fetchAllClients = async () => {
    const response = await fetch('https://4qpek8qkm8.execute-api.us-east-2.amazonaws.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {
                    getAllClients {
                        id
                        name
                        representative
                        code
                    }
                }
            `,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.message || 'Error al obtener cantidad de usuarios');
    }

    const { data }: { data: { getAllClients: any[] } } = await response.json();
    return data;
};

export const useAllClients = () => {
    return useQuery('allClients', fetchAllClients, {
        staleTime: Infinity, // Datos no se consideran "stale" inmediatamente
        cacheTime: Infinity, // Datos se mantienen en caché indefinidamente
        // Otras opciones útiles:
        // refetchOnMount: false,
        // refetchOnWindowFocus: false,
        // retry: 3,
    });
};