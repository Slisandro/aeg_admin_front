import React from 'react';
import useFormikHook from "../hooks/use-formik-hook";
import i18n from '../i18n/config';

interface CoursesFormValues { // Otra interfaz diferente
    id: string,
    name: string,
    duration: number
}

const CourseFormComponent = ({ toggleModal, entity }: { toggleModal: () => void, entity?: CoursesFormValues }) => {
    const initialValues: CoursesFormValues = {
        id: entity?.id ?? '',
        name: entity?.name ?? '',
        duration: entity?.duration ?? 0
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ values });
        toggleModal()
    };

    const { values, errors, handleChange } = useFormikHook(initialValues);

    return (
        <>
            <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                <div className="my-2 flex flex-col w-full gap-2">
                    <label htmlFor="name" className="text-lg font-semibold">{i18n.t("modules.courses.table.columns.name")}</label>
                    <input type='text' name="name" value={values.name} onChange={handleChange} id="name" className="px-2 py-3 outline-none border-2 rounded-lg border-[rgba(0,0,0,.25)]" />
                </div>
                <div className="my-2 flex flex-col w-full w-full gap-2">
                    <label htmlFor="number" className="text-lg font-semibold">{i18n.t("modules.courses.table.columns.duration")}</label>
                    <input className="px-2 py-3 outline-none border-2 rounded-lg border-[rgba(0,0,0,.25)]" type='number' name="number" value={values.duration} onChange={handleChange} id="number" />
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
                        disabled
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