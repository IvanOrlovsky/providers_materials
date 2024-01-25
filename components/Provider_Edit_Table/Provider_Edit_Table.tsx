import { getProviderById } from "@/app/db/queries"

export default async function Provider_Edit_Table({id}: { id: string }) {

    let providers_data = await getProviderById(id)
    let provider_row = providers_data.rows[0]

    return (
        <>
            <input
                type="hidden"
                name="prevProviderInfo"
                value={JSON.stringify({provider_row})}
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
                                placeholder={provider_row['Номер поставщика']}
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
                                    placeholder={provider_row['Название компании']}
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
                                    placeholder={provider_row['Номер телефона']}
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
                                    placeholder={provider_row['Адрес']}
                                    className="input"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
    )
}