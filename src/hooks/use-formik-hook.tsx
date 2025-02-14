import { FormikValues, useFormik } from 'formik';

export default function useFormikHook<T extends FormikValues>(
    initialValues: T,
) {
    const formik = useFormik<T>({
        initialValues,
        onSubmit: () => {}
    });

    return formik;
}