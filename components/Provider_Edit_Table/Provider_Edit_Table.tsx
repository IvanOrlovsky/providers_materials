"use client"

import { getProviderById } from "@/app/db/queries"
import { useEffect, useState } from "react";

export default function Provider_Edit_Table({id}: { id: string }) {

    const [providerData, setProviderData] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await getProviderById(id);
            setProviderData(result.rows[0]);
        };
        fetchData();
      }, [id]);


    return (
        <>
            <input
                type="hidden"
                name="prevProviderInfo"
                value={JSON.stringify({providerData})}
            />
            <table className="table is-bordered my-5">
                    <tbody>
                        <tr>
                            <th>
                                Номер поставщика
                            </th>
                            <td>
                                <input
                                name="providerId"
                                type='number'
                                placeholder={providerData['Номер поставщика']}
                                className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Тип поставщика
                            </th>
                            <td>
                                <div className="select">
                                    <select 
                                    name="providerType"
                                    defaultValue=""
                                    >
                                        <option 
                                        value=""
                                        hidden
                                        >
                                        </option>
                                        <option 
                                        value="ИП"
                                        >
                                            ИП
                                        </option>
                                        <option 
                                        value="Самозанятый"
                                        >
                                            Самозанятый
                                        </option>
                                        <option 
                                        value="ООО"
                                        >
                                            ООО
                                        </option>
                                        <option 
                                        value="АО"
                                        >
                                            АО
                                        </option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Название компании
                            </th>
                            <td>
                                <input
                                    name="providerName"
                                    type='text'
                                    placeholder={providerData['Название компании']}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Номер телефона
                            </th>
                            <td>
                                <input
                                    name="providerNumber"
                                    type='tel'
                                    placeholder={providerData['Номер телефона']}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Адрес
                            </th>
                            <td>
                                <input
                                    name="providerAdress"
                                    type="text"
                                    placeholder={providerData['Адрес']}
                                    className="input"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
    )
}