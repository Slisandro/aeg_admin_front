import { useMutation } from 'react-query';

interface Course {
    id?: string;
    name: string;
    duration: number;
}

const fetchCreateOrUpdateCourse = async ({ id, name, duration }: Course) => {
    const variables = id ? { id, name, duration } : { name, duration }
    const response = await fetch('https://4qpek8qkm8.execute-api.us-east-2.amazonaws.com/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: id ? `
                mutation createOrUpdateCourse($id: String!, $name: String!, $representative: String!, $code: String!, $entityType: String!) {
                  createOrUpdateCourse(id: $id, name: $name, representative: $representative, code: $code, entityType: $entityType)
                }
            ` : `
                mutation createOrUpdateCourse($name: String!, $representative: String!, $code: String!, $entityType: String!) {
                  createOrUpdateCourse(name: $name, representative: $representative, code: $code, entityType: $entityType)
                }
            `,
            variables: { ...variables, entityType: "course" },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.message || 'Error creating/updating course');
    }

    const { data }: { data: { createOrUpdateCourse: Course } } = await response.json();
    return data.createOrUpdateCourse;
};

export const useCreateOrUpdateCourse = () => {
    return useMutation(fetchCreateOrUpdateCourse);
};