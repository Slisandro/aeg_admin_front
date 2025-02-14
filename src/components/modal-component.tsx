import { ReactElement, useContext, useState } from 'react';
import { LanguageContext } from '../context/i18n-context';

export default function ModalComponent({ title, button, children, isModalOpen, toggleModal }: { title: string, button: ReactElement, children: ReactElement, isModalOpen: boolean , toggleModal: () => void }) {
    const { } = useContext(LanguageContext);

    return (
        <div>
            <div className="cursor-pointer" onClick={toggleModal}>
                {button}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 max-h-[75vh] lg:h-auto overflow-y-auto shadow-lg w-5/6 lg:w-1/2"> {/* Adjust width as needed */}
                        <h2 className="text-2xl font-bold mb-4">{title}</h2>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}