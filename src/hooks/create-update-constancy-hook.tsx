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
            query: id ? `mutation createOrUpdateConstancy($id: String!, $startDate: String!, $endDate: String!, $userId: String!, $clientId: String!, $courseId: String!, $entityType: String!) { createOrUpdateConstancy(id: $id, startDate: $startDate, endDate: $endDate, userId: $userId, clientId: $clientId, courseId: $courseId, entityType: $entityType)}` : `mutation createOrUpdateConstancy($startDate: String!, $endDate: String!, $userId: String!, $clientId: String!, $courseId: String!, $entityType: String!) {
                  createOrUpdateConstancy(startDate: $startDate, endDate: $endDate, userId: $userId, clientId: $clientId, courseId: $courseId, entityType: $entityType)
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