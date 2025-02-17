import React from 'react';
import useFormikHook from "../hooks/use-formik-hook";
import { useStore } from '../store';
import i18n from '../i18n/config';
import * as Yup from 'yup';
import { useCreateOrUpdateConstancy } from '../hooks/create-update-constancy-hook';
import { useAllConstancies } from '../hooks/use-all-constancies-hook';

interface ConstanciesFormValues {
    id: string,
    startDate: string,
    endDate: string,
    userId: string,
    clientId: string,
    courseId: string
}

interface ConstanciesDto {
    id: string,
    startDate: string,
    endDate: string,
    user: {
        id: string
    },
    client: {
        id: string
    },
    course: {
        id: string
    }
}

const ConstancyFormSchema = Yup.object().shape({
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required'),
    userId: Yup.string().required('User is required'),
    clientId: Yup.string().required('Client is required'),
    courseId: Yup.string().required('Course is required'),
});

const date = new Date();
const formattedDate = date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });

const ConstancyFormComponent = ({ toggleModal, entity }: { toggleModal: () => void, entity?: ConstanciesDto }) => {
    const { mutate } = useCreateOrUpdateConstancy();

    const { refetch: refectAllConstancies } = useAllConstancies();

    const { allUsers, allClients, allCourses } = useStore();
    const initialValues: ConstanciesFormValues = {
        id: entity?.id ?? '',
        startDate: entity?.startDate ?? formattedDate,
        endDate: entity?.endDate ?? formattedDate,
        userId: entity?.user?.id ?? '',
        clientId: entity?.client?.id ?? '',
        courseId: entity?.course?.id ?? ''
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!Object.keys(errors).length) {
            try {
                mutate(values, {
                    onSuccess: () => {
                        refectAllConstancies();
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

    const { values, errors, handleChange, touched, handleBlur } = useFormikHook(initialValues, ConstancyFormSchema);

    return (
        <>
            <form className="flex flex-col gap-2 w-full h-auto" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col lg:flex-row gap-2">
                    <div className="my-2 flex flex-col w-full lg:w-1/2 gap-2">
                        <label htmlFor="startDate" className="text-lg font-semibold">{i18n.t("modules.constancies.table.columns.startDate")}</label>
                        <input type='date' name="startDate" value={values.startDate} onChange={handleChange} id="startDate" className={`appearance-none px-2 py-3 outline-none border-2 rounded-lg border-[rgba(0,0,0,.25)] ${touched.startDate && errors.startDate ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'}`} onBlur={handleBlur} />
                        {touched.startDate && errors.startDate && (<p className="text-red-500 pl-2 font-bold">{errors.startDate}</p>)}
                    </div>
                    <div className="my-2 flex flex-col w-full lg:w-1/2 gap-2">
                        <label htmlFor="endDate" className="text-lg font-semibold">{i18n.t("modules.constancies.table.columns.endDate")}</label>
                        <input className={`appearance-none px-2 py-3 outline-none border-2 rounded-lg border-[rgba(0,0,0,.25)] ${touched.endDate && errors.endDate ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'}`} onBlur={handleBlur} type='date' name="endDate" value={values.endDate} onChange={handleChange} id="endDate" />
                        {touched.endDate && errors.endDate && (<p className="text-red-500 pl-2 font-bold">{errors.endDate}</p>)}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-2">
                    <div className="my-2 flex flex-col w-full lg:w-1/3 w-full gap-2">
                        <label htmlFor="endDate" className="text-lg font-semibold">{i18n.t("modules.constancies.table.columns.user.name")}</label>
                        <select name="userId" id="userId" value={values.userId} onChange={handleChange} className={`x-2 py-3 outline-none border-2 rounded-lg ${touched.userId && errors.userId ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'} pl-2`} onBlur={handleBlur}>
                            {allUsers?.map(user => <option key={user.id} value={user.id}>{user.name + " - " + user.role}</option>)}
                        </select>
                        {touched.userId && errors.userId && (<p className="text-red-500 pl-2 font-bold">{errors.userId}</p>)}
                    </div>

                    <div className="my-2 flex flex-col w-full lg:w-1/3 gap-2">
                        <label htmlFor="endDate" className="text-lg font-semibold">{i18n.t("modules.constancies.table.columns.client.name")}</label>
                        <select name="clientId" id="clientId" value={values.clientId} onChange={handleChange} className={`px-2 py-3 outline-none border-2 rounded-lg ${touched.clientId && errors.clientId ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'} pl-2`} onBlur={handleBlur}>
                            {allClients?.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                        </select>
                        {touched.clientId && errors.clientId && (<p className="text-red-500 pl-2 font-bold">{errors.clientId}</p>)}
                    </div>

                    <div className="my-2 flex flex-col w-full lg:w-1/3 gap-2">
                        <label htmlFor="endDate" className="text-lg font-semibold">{i18n.t("modules.constancies.table.columns.course.name")}</label>
                        <select name="courseId" id="courseId" onChange={handleChange} value={values.courseId} className={`px-2 py-3 outline-none border-2 rounded-lg ${touched.courseId && errors.courseId ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'} pl-2`} onBlur={handleBlur}>
                            {allCourses?.map(course => <option key={course.id} value={course.id}>{course.name}</option>)}
                        </select>
                        {touched.courseId && errors.courseId && (<p className="text-red-500 pl-2 font-bold">{errors.courseId}</p>)}
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
                        className="bg-[#2D68A2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {entity ? i18n.t("modules.constancies.action.edit") : i18n.t("table.action.create")}
                    </button>
                </div>
            </form>

        </>
    )
};

export default ConstancyFormComponent;