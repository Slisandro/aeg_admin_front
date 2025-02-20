import React from 'react';
import { useCreateOrUpdateClient } from '../hooks/create-update-client-hook';
import { useAllClients } from '../hooks/use-all-clients-hook';
import useFormikHook from "../hooks/use-formik-hook";
import i18n from '../i18n/config';
import ClientFormValuesInterface from '../interfaces/client-form-values-interface';
import ClientFormSchemaUtilities from '../utilities/yup-client-form-utilities';
import InputComponent from './input-component';

const ClientFormComponent = ({ toggleModal, entity }: { toggleModal: () => void, entity?: ClientFormValuesInterface }) => {
    const { mutate } = useCreateOrUpdateClient();

    const { refetch: refectAllClients } = useAllClients();

    const initialValues: ClientFormValuesInterface = {
        id: entity?.id ?? '',
        name: entity?.name ?? '',
        representative: entity?.representative ?? '',
        code: entity?.code ?? ''
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!Object.keys(errors).length) {
            try {
                mutate(values, {
                    onSuccess: () => {
                        refectAllClients();
                        toggleModal();
                    },
                    onError: (err) => {
                        console.error("Mutacion error:", err)
                    }
                });
            } catch (err) {
                console.error("Error:", err)
            }
        }
    };

    const { values, errors, handleChange, touched, handleBlur } = useFormikHook(initialValues, ClientFormSchemaUtilities);

    return (
        <>
            <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                <InputComponent  
                    value={values.name}
                    classNameContainer="my-2 flex flex-col w-full gap-2"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.name}
                    touched={touched.name} 
                    name={"name"} 
                    type={"string"}
                />
                <InputComponent  
                    value={values.representative}
                    classNameContainer="my-2 flex flex-col w-full gap-2"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.representative}
                    touched={touched.representative} 
                    name={"representative"} 
                    type={"string"}
                />
                <InputComponent  
                    value={values.code}
                    classNameContainer="my-2 flex flex-col w-full gap-2"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.code}
                    touched={touched.code} 
                    name={"code"} 
                    type={"string"}
                />

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
                        {entity ? i18n.t("modules.clients.action.edit") : i18n.t("table.action.create")}
                    </button>
                </div>
            </form>

        </>
    )
};

export default ClientFormComponent;