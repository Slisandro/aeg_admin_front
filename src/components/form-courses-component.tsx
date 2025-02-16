import React from 'react';
import useFormikHook from "../hooks/use-formik-hook";
import i18n from '../i18n/config';
import * as Yup from 'yup';

interface CoursesFormValues { // Otra interfaz diferente
    id: string,
    name: string,
    duration: number
}

const CourseFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    duration: Yup.number().required('Duration is required')
});

const CourseFormComponent = ({ toggleModal, entity }: { toggleModal: () => void, entity?: CoursesFormValues }) => {
    const initialValues: CoursesFormValues = {
        id: entity?.id ?? '',
        name: entity?.name ?? '',
        duration: entity?.duration ?? 0
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!Object.keys(errors).length) {
            toggleModal()
        }
    };

    const { values, errors, handleChange, touched, handleBlur } = useFormikHook(initialValues, CourseFormSchema);

    return (
        <>
            <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                <div className="my-2 flex flex-col w-full gap-2">
                    <label htmlFor="name" className="text-lg font-semibold">{i18n.t("modules.courses.table.columns.name")}</label>
                    <input type='text' name="name" value={values.name} onChange={handleChange} id="name" className={`px-2 py-3 outline-none border-2 rounded-lg ${touched.name && errors.name ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'}`} onBlur={handleBlur}/>
                    {touched.name && errors.name && (<p className="text-red-500 pl-2 font-bold">{errors.name}</p>)}
                </div>
                <div className="my-2 flex flex-col w-full w-full gap-2">
                    <label htmlFor="duration" className="text-lg font-semibold">{i18n.t("modules.courses.table.columns.duration")}</label>
                    <input className={`px-2 py-3 outline-none border-2 rounded-lg ${touched.duration && errors.duration ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'}`} type='number' name="duration" value={values.duration} onChange={handleChange} id="duration" onBlur={handleBlur} />
                    {touched.duration && errors.duration && (<p className="text-red-500 pl-2 font-bold">{errors.duration}</p>)}
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

export default CourseFormComponent;