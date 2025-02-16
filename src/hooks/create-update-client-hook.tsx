import { useMutation } from 'react-query';

interface Client {
    id?: string;
    name: string;
    representative: string;
    code: string;
}

const fetchCreateOrUpdateClient = async ({ id, name, representative, code }: Client) => {  // Include ID if 
    const variables = id ? { id, name, representative, code } : { name, representative, code }
    const response = await fetch('https://4qpek8qkm8.execute-api.us-east-2.amazonaws.com/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: id ? `
                mutation createOrUpdateClient($id: String!, $name: String!, $representative: String!, $code: String!, $entityType: String!) {
                  createOrUpdateClient(id: $id, name: $name, representative: $representative, code: $code, entityType: $entityType)
                }
            ` : `
                mutation createOrUpdateClient($name: String!, $representative: String!, $code: String!, $entityType: String!) {
                  createOrUpdateClient(name: $name, representative: $representative, code: $code, entityType: $entityType)
                }
            `,
            variables: { ...variables, entityType: "client" },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.message || 'Error creating/updating client');
    }

    const { data }: { data: { createOrUpdateClient: Client } } = await response.json(); // Type the response correctly!
    return data.createOrUpdateClient; // Return the client object
};

export const useCreateOrUpdateClient = () => {
    return useMutation(fetchCreateOrUpdateClient);
};