import { FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';

export default function useFormikHook<T extends FormikValues>(
    initialValues: T,
    validationSchema?: Yup.ObjectSchema<T>
) {
    const formik = useFormik<T>({
        initialValues,
        validationSchema,
        onSubmit: () => {}
    });

    return formik;
}