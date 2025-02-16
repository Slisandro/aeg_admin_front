import { useMutation } from 'react-query';

interface Constancy {
    id?: string;
    startDate: string;
    endDate: string;
    userId: string;
    courseId: string;
    clientId: string;
}

const fetchCreateOrUpdateConstancy = async ({ id, startDate, endDate, userId, courseId, clientId }: Constancy) => {
    const variables = id ? { id, startDate, endDate, userId, courseId, clientId } : { startDate, endDate, userId, courseId, clientId }
    const response = await fetch('https://4qpek8qkm8.execute-api.us-east-2.amazonaws.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: id ? `
                mutation createOrUpdateConstancy($id: String!, $name: String!, $representative: String!, $code: String!, $entityType: String!) {
                  createOrUpdateConstancy(id: $id, name: $name, representative: $representative, code: $code, entityType: $entityType)
                }
            ` : `
                mutation createOrUpdateConstancy($name: String!, $representative: String!, $code: String!, $entityType: String!) {
                  createOrUpdateConstancy(name: $name, representative: $representative, code: $code, entityType: $entityType)
                }
            `,
            variables: { ...variables, entityType: "constancy" },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.message || 'Error creating/updating constancy');
    }

    const { data }: { data: { createOrUpdateConstancy: Constancy } } = await response.json();
    return data.createOrUpdateConstancy;
};

export const useCreateOrUpdateConstancy = () => {
    return useMutation(fetchCreateOrUpdateConstancy);
};