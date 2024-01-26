import { getProviderById } from "@/app/db/queries";
import { useEffect, useState, Dispatch, SetStateAction, ChangeEvent } from "react";

export default function Provider_Edit_Table({ id, setProviderEditData, setProviderDataLoadedState }: {
    id: string,
    setProviderEditData: Dispatch<SetStateAction<any>>,
    setProviderDataLoadedState: Dispatch<SetStateAction<any>>
}) {
    const [providerData, setProviderData] = useState<any>({});

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
                "providerType": result.rows[0]['Тип поставщика'],
                "providerName": result.rows[0]['Название компании'],
                "providerNumber": result.rows[0]['Номер телефона'],
                "providerAddress": result.rows[0]['Адрес'],
            });
            setProviderName(result.rows[0]['Название компании'] || "");
            setProviderNumber(result.rows[0]['Номер телефона'] || "");
            setProviderAddress(result.rows[0]['Адрес'] || "");
            setProviderType(result.rows[0]['Тип поставщика'] || "");
        };
        fetchData();
        setProviderDataLoadedState(true);
    }, [id]);



    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
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
                            Тип поставщика
                        </th>
                        <td>
                            <div className="select">
                                <select
                                    name="providerType"
                                    defaultValue={providerType}
                                    onChange={handleChange}
                                    required
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
                                // defaultValue={providerData['Название компании']}
                                placeholder={providerData['Название компании']}
                                className="input"
                                value={providerName}
                                onChange={handleChange}
                                required
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
                                required
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
                                required
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
