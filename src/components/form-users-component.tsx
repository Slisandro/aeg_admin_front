import React from 'react';
import useFormikHook from "../hooks/use-formik-hook";
import i18n from '../i18n/config';
import * as Yup from 'yup';

interface UserFormValues { // Otra interfaz diferente
    id: string,
    name: string,
    role: 'Admin' | 'User',
    email: string
}

const UsersFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    role: Yup.string().required('Role is required'),
    email: Yup.string().email("Email invalid.").required('Email is required'),
});

const UserFormComponent = ({ toggleModal, entity }: { toggleModal: () => void, entity?: UserFormValues }) => {
    const initialValues: UserFormValues = {
        id: entity?.id ?? '',
        name: entity?.name ?? '',
        role: entity?.role ?? 'User',
        email: entity?.email ?? '',
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!Object.keys(errors).length) {
            toggleModal()
        }
    };

    const { values, errors, handleChange, touched, handleBlur } = useFormikHook(initialValues, UsersFormSchema);

    return (
        <>
            <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                <div className="my-2 flex flex-col w-full gap-2">
                    <label htmlFor="name" className="text-lg font-semibold">{i18n.t("modules.users.table.columns.name")}</label>
                    <input type='text' name="name" value={values.name} onChange={handleChange} id="name" className={`px-2 py-3 outline-none border-2 rounded-lg ${touched.name && errors.name ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'}`} onBlur={handleBlur} />
                    {touched.name && errors.name && (<p className="text-red-500 pl-2 font-bold">{errors.name}</p>)}
                </div>
                <div className="my-2 flex flex-col w-full w-full gap-2">
                    <label htmlFor="email" className="text-lg font-semibold">{i18n.t("modules.users.table.columns.email")}</label>
                    <input className={`px-2 py-3 outline-none border-2 rounded-lg ${touched.email && errors.email ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'}`} onBlur={handleBlur} type='email' name="email" value={values.email} onChange={handleChange} id="email" />
                    {touched.email && errors.email && (<p className="text-red-500 pl-2 font-bold">{errors.email}</p>)}
                </div>
                <div className="my-2 flex flex-col w-full gap-2">
                    <label htmlFor="role" className="text-lg font-semibold">{i18n.t("modules.users.table.columns.role")}</label>
                    <select name="role" id="role" value={values.role} onChange={handleChange} className={`px-2 py-3 outline-none border-2 rounded-lg ${touched.role && errors.role ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'}`} onBlur={handleBlur}>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    {touched.role && errors.role && (<p className="text-red-500 pl-2 font-bold">{errors.role}</p>)}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                        onClick={toggleModal}
                    >
                        {i18n.t("table.action.cancel")}
                    </button>
                    <button
                        type="submit"
                        className="bg-[#2D68A2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {i18n.t("table.action.create")}
                    </button>
                </div>
            </form>

        </>
    )
};

export default UserFormComponent;