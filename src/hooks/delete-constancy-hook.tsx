import { useMutation } from 'react-query';

const fetchDeleteConstancy = async ({ id }: { id: string }) => {
    const response = await fetch('https://4qpek8qkm8.execute-api.us-east-2.amazonaws.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                mutation deleteConstancy($id: String!) {
                  deleteConstancy(id: $id)
                }
            `,
            variables: { id },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.message || 'Error deleting Constancy');
    }

    const { data }: { data: { deleteConstancy: boolean } } = await response.json();
    return data.deleteConstancy;
};

export const useDeleteConstancy = () => {
    return useMutation(fetchDeleteConstancy);
};