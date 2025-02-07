import { useQuery } from 'react-query';

const fetchCourses = async () => {
    const response = await fetch('https://4qpek8qkm8.execute-api.us-east-2.amazonaws.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {
                    coursesCount
                }
            `,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.message || 'Error al obtener cantidad de usuarios');
    }

    const { data }: { data: { coursesCount: number } } = await response.json();
    return data;
};

export const useCoursesCount = () => {
    return useQuery('courses', fetchCourses, {
        staleTime: Infinity, // Datos no se consideran "stale" inmediatamente
        cacheTime: Infinity, // Datos se mantienen en caché indefinidamente
        // Otras opciones útiles:
        // refetchOnMount: false,
        // refetchOnWindowFocus: false,
        // retry: 3,
    });
};