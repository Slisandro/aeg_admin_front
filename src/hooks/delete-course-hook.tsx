import { useMutation } from 'react-query';

const fetchDeleteCourse = async ({ id }: { id: string }) => {
    const response = await fetch('https://4qpek8qkm8.execute-api.us-east-2.amazonaws.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                mutation deleteCourse($id: String!) {
                  deleteCourse(id: $id)
                }
            `,
            variables: { id },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.message || 'Error deleting course');
    }

    const { data }: { data: { deleteCourse: boolean } } = await response.json();
    return data.deleteCourse;
};

export const useDeleteCourse = () => {
    return useMutation(fetchDeleteCourse);
};