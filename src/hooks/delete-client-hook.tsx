import { useMutation } from 'react-query';

const fetchDeleteClient = async ({ id }: { id: string }) => {
    const response = await fetch('https://4qpek8qkm8.execute-api.us-east-2.amazonaws.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                mutation deleteClient($id: String!) {
                  deleteClient(id: $id)
                }
            `,
            variables: { id },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.message || 'Error deleting Client');
    }

    const { data }: { data: { deleteClient: boolean } } = await response.json();
    return data.deleteClient;
};

export const useDeleteClient = () => {
    return useMutation(fetchDeleteClient);
};