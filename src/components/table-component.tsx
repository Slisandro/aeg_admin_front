import React, { useContext, useState } from "react";
import i18n from '../i18n/config';
import { LanguageContext } from "../context/i18n-context";

export default function TableComponent({ toggleDeleteItem, setEntity, columns, columnsKey, data, countPerPage }: { columns: string[], data: any[], countPerPage: number, columnsKey: string[], setEntity: React.Dispatch<React.SetStateAction<any>>, toggleDeleteItem: (i: string) => void }) {
    const { } = useContext(LanguageContext);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const handleSort = (column: any) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortColumn) return 0;

        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleSelectAll = (event: any) => {
        if (event.target.checked) {
            setSelectedRows(data.map(row => row.id)); // Asumiendo que tus datos tienen un campo 'id' único
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id: string) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleEditRow = (t: any) => {
        setEntity(t);
    }

    return (
        <div className="relative shadow-md w-full lg:max-w-[80vw] overflow-x-auto sm:rounded-lg w-full">
            <table className="w-full whitespace-nowrap border-collapse overflow-x-scroll w-full lg:max-w-[80vw] table-auto text-sm text-left rtl:text-right text-gray-500">
                <THead
                    columns={columns}
                    handleSelectAll={handleSelectAll}
                    sortColumn={sortColumn}
                    handleSort={handleSort}
                />
                <TBody
                    sortedData={sortedData}
                    selectedRows={selectedRows}
                    columnsKey={columnsKey}
                    handleSelectRow={handleSelectRow}
                    toggleDeleteItem={toggleDeleteItem}
                    handleEditRow={handleEditRow}
                />
            </table>
            <TFooter countPerPage={countPerPage} totalItems={data.length} />
        </div>
    )
}

const THead = (
    { handleSelectAll, columns, sortColumn, handleSort }:
        {
            handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void,
            columns: string[]
            sortColumn: string,
            handleSort: (col: string) => void,
        }) => {
    return (
        <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                            onChange={handleSelectAll}
                        />
                    </div>
                </th>
                {columns.map((col: string) => (
                    <th scope="col" className="px-6 py-3 text-lg">
                        <div className="flex items-center" onClick={() => handleSort(col)}>
                            {col}
                            {
                                sortColumn === col && (
                                    <svg className="w-3 h-3 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={"M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"} />
                                    </svg>
                                )
                            }
                        </div>
                    </th>
                ))}
                <th scope="col" className="p-4">
                </th>
            </tr>
        </thead>
    )
};

const TBody = (
    { sortedData, selectedRows, columnsKey, handleSelectRow, handleEditRow, toggleDeleteItem }
        : { sortedData: any[], selectedRows: string[], handleSelectRow: (row: string) => void, columnsKey: string[], handleEditRow: React.Dispatch<React.SetStateAction<any>>, toggleDeleteItem: (i: string) => void}) => {
    return (
        <tbody>
            {sortedData.map(d => (
                <tr key={d.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <td className="w-4 p-4">
                        <div className="flex items-center">
                            <input
                                id="checkbox-table-search-1"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                                checked={selectedRows.includes(d.id)} // Enlaza el estado checked
                                onChange={() => handleSelectRow(d.id)} // Llama a handleSelectRow al cambiar el checkbox
                            />
                        </div>
                    </td>

                    {columnsKey.map(c => (
                        <td key={c} className="px-6 py-4">
                            {c.includes(".") ? c.split('.').reduce((o, i) => o[i], d) : d[c]}
                        </td>
                    ))}

                    <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => handleEditRow(d)} className="font-medium text-blue-600 hover:underline">{i18n.t("table.action.edit")}</button>
                        <button onClick={() => toggleDeleteItem(d.id)} className="font-medium text-red-600 hover:underline">{i18n.t("table.action.delete")}</button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
};

const TFooter = (
    { countPerPage, totalItems }
        : { countPerPage: number, totalItems: number }
) => {
    return (
        <nav className="fixed w-[90%] mt-4 lg:w-[80%] flex items-center flex-column flex-nowrap lg:flex-wrap md:flex-row justify-between p-4">
            <span className="text-sm font-normal text-gray-500 lg:mb-4 md:mb-0 block w-full md:inline md:w-auto">{i18n.t("table.footer.showing")} <span className="font-semibold text-gray-900">1-{countPerPage}</span> {i18n.t("table.footer.of")} <span className="font-semibold text-gray-900">{totalItems}</span></span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 hidden lg:block">{i18n.t("table.footer.action.prev")}</button>
                </li>
                <li>
                    <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 lg:hidden">{"<"}</button>
                </li>
                <li>
                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</button>
                </li>
                <li>
                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 lg:hidden">{">"}</button>
                </li>
                <li>
                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 hidden lg:block">{i18n.t("table.footer.action.next")}</button>
                </li>
            </ul>
        </nav>
    )
}