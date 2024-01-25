import { getProviderById } from "@/app/db/queries";
import { useEffect, useState, Dispatch, SetStateAction, ChangeEvent } from "react";

export default function Provider_Edit_Table({ id, setProviderEditData }: {
    id: string,
    setProviderEditData: Dispatch<SetStateAction<any>>
}) {
    const [providerData, setProviderData] = useState<any>({});

    const [providerId, setProviderId] = useState("")
    const [providerType, setProviderType] = useState("")
    const [providerName, setProviderName] = useState("")
    const [providerNumber, setProviderNumber] = useState("")
    const [providerAddress, setProviderAddress] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const result = await getProviderById(id);
            setProviderData(result.rows[0]);
            setProviderEditData({
                "prevProviderInfo" : result.rows[0],
                "providerId": "",
                "providerType": "",
                "providerName": "",
                "providerNumber": "",
                "providerAddress": "",
            });
        };
        fetchData();

    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "providerId":
                setProviderId(value);
                setProviderEditData((prevData: any) => ({
                    ...prevData,
                    "providerId": value,
                }));
                break;
            case "providerType":
                setProviderType(value);
                setProviderEditData((prevData: any) => ({
                    ...prevData,
                    "providerType": value,
                }));
                break;
            case "providerName":
                setProviderName(value);
                setProviderEditData((prevData: any) => ({
                    ...prevData,
                    "providerName": value,
                }));
                break;
            case "providerNumber":
                setProviderNumber(value);
                setProviderEditData((prevData: any) => ({
                    ...prevData,
                    "providerNumber": value,
                }));
                break;
            case "providerAddress":
                setProviderAddress(value);
                setProviderEditData((prevData: any) => ({
                    ...prevData,
                    "providerAddress": value,
                }));
                break;
            default:
                break;
        }
    }

    return (
        <>
            <input
                type="hidden"
                name="prevProviderInfo"
                value={JSON.stringify({ providerData })}
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
                                value={providerId}
                                onChange={handleChange}
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
                                    value={providerType}
                                    onChange={handleChange}
                                >
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
                                value={providerName}
                                onChange={handleChange}
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
                                value={providerNumber}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Адрес
                        </th>
                        <td>
                            <input
                                name="providerAddress"
                                type="text"
                                placeholder={providerData['Адрес']}
                                className="input"
                                value={providerAddress}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
