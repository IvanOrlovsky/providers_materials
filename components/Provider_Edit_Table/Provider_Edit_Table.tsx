import { getProviderById } from "@/app/db/queries"

export default async function Provider_Edit_Table({id}: { id: string }) {

    let providers_data = await getProviderById(id)
    let provider_row = providers_data.rows[0]

    return (
        <table className="table is-bordered my-5">
                            <tbody>
                                <tr>
                                    <th>
                                        Номер поставщика
                                    </th>
                                    <td>
                                        <input
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
                                            name="type"
                                            defaultValue=""
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
                                            type="text"
                                            placeholder={provider_row['Адрес']}
                                            className="input"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
    )
}