import * as Yup from 'yup';

const ClientFormSchemaUtilities = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    representative: Yup.string().required('Representative is required'),
    code: Yup.string().required('Code is required'),
});

export default ClientFormSchemaUtilities;