import { useMutation } from 'react-query';

interface User {
    id?: string;
    name: string;
    role: string;
    email: string;
}

const fetchCreateOrUpdateUser = async ({ id, name, role, email }: User) => {
    const variables = id ? { id, name, role, email } : { name, role, email }
    const response = await fetch('https://4qpek8qkm8.execute-api.us-east-2.amazonaws.com/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: id ? `
                mutation createOrUpdateUser($id: String!, $name: String!, $representative: String!, $code: String!, $entityType: String!) {
                  createOrUpdateUser(id: $id, name: $name, representative: $representative, code: $code, entityType: $entityType)
                }
            ` : `
                mutation createOrUpdateUser($name: String!, $representative: String!, $code: String!, $entityType: String!) {
                  createOrUpdateUser(name: $name, representative: $representative, code: $code, entityType: $entityType)
                }
            `,
            variables: { ...variables, entityType: "user" },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.message || 'Error creating/updating user');
    }

    const { data }: { data: { createOrUpdateUser: User } } = await response.json();
    return data.createOrUpdateUser;
};

export const useCreateOrUpdateUser = () => {
    return useMutation(fetchCreateOrUpdateUser);
};