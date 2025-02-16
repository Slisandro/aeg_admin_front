import { useMutation } from 'react-query';

const fetchDeleteUser = async ({ id }: { id: string }) => {
    const response = await fetch('https://4qpek8qkm8.execute-api.us-east-2.amazonaws.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                mutation deleteUser($id: String!) {
                  deleteUser(id: $id)
                }
            `,
            variables: { id },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.message || 'Error deleting User');
    }

    const { data }: { data: { deleteUser: boolean } } = await response.json();
    return data.deleteUser;
};

export const useDeleteUser = () => {
    return useMutation(fetchDeleteUser);
};