import React from 'react';
import useFormikHook from "../hooks/use-formik-hook";
import { useStore } from '../store';
import i18n from '../i18n/config';

interface ConstanciesFormValues {
    id: string,
    startDate: string,
    endDate: string,
    userId: string,
    clientId: string,
    courseId: string
}

const date = new Date();
const formattedDate = date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });

const ConstancyFormComponent = ({ toggleModal, entity }: { toggleModal: () => void, entity?: ConstanciesFormValues }) => {
    const { allUsers, allClients, allCourses } = useStore();
    const initialValues: ConstanciesFormValues = {
        id: entity?.id ?? '',
        startDate: entity?.startDate ?? formattedDate,
        endDate: entity?.endDate ?? formattedDate,
        userId: entity?.userId ?? '',
        clientId: entity?.clientId ?? '',
        courseId: entity?.courseId ?? ''
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ values });
        toggleModal()
    };

    const { values, errors, handleChange } = useFormikHook(initialValues);

    return (
        <>
            <form className="flex flex-col gap-2 w-full h-auto" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col lg:flex-row gap-2">
                    <div className="my-2 flex flex-col w-full lg:w-1/2 gap-2">
                        <label htmlFor="startDate" className="text-lg font-semibold">{i18n.t("modules.constancies.table.columns.startDate")}</label>
                        <input type='date' name="startDate" value={values.startDate} onChange={handleChange} id="startDate" className="appearance-none px-2 py-3 outline-none border-2 rounded-lg border-[rgba(0,0,0,.25)]" />
                    </div>
                    <div className="my-2 flex flex-col w-full lg:w-1/2 gap-2">
                        <label htmlFor="endDate" className="text-lg font-semibold">{i18n.t("modules.constancies.table.columns.endDate")}</label>
                        <input className="appearance-none px-2 py-3 outline-none border-2 rounded-lg border-[rgba(0,0,0,.25)]" type='date' name="endDate" value={values.endDate} onChange={handleChange} id="endDate" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-2">
                    <div className="my-2 flex flex-col w-full lg:w-1/3 w-full gap-2">
                        <label htmlFor="endDate" className="text-lg font-semibold">{i18n.t("modules.constancies.table.columns.user.name")}</label>
                        <select name="userId" id="userId" value={values.userId} onChange={handleChange} className="px-2 py-3 outline-none border-2 rounded-lg border-[rgba(0,0,0,.25)]">
                            {allUsers?.map(user => <option key={user.id} value={user.id}>{user.name + " - " + user.role}</option>)}
                        </select>
                    </div>

                    <div className="my-2 flex flex-col w-full md:w-1/3 gap-2">
                        <label htmlFor="endDate" className="text-lg font-semibold">{i18n.t("modules.constancies.table.columns.client.name")}</label>
                        <select name="clientId" id="clientId" value={values.clientId} onChange={handleChange} className="px-2 py-3 outline-none border-2 rounded-lg border-[rgba(0,0,0,.25)]">
                            {allClients?.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                        </select>
                    </div>

                    <div className="my-2 flex flex-col w-full md:w-1/3 gap-2">
                        <label htmlFor="endDate" className="text-lg font-semibold">{i18n.t("modules.constancies.table.columns.course.name")}</label>
                        <select name="courseId" id="courseId" value={values.courseId} className="px-2 py-3 outline-none border-2 rounded-lg border-[rgba(0,0,0,.25)]">
                            {allCourses?.map(course => <option key={course.id} value={course.id}>{course.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end mt-6 pb-4">
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

export default ConstancyFormComponent;