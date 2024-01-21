import { getProviderById } from "@/app/db/queries"


export default async function EditProvider({ params } : { params: { id: string } }) {

    let { rows } = await getProviderById(params.id)

    return (
        <div className="container my-5">
            <h1 className="title has-text-centered">
                Редактирование поставщика номер {params.id}
            </h1>
            <form>
                <div className="tile is-ancestor">
                    <div className="tile is-child box">
                        <p className="is-size-5">
                            <strong>
                                Информация о поставщике
                            </strong>                        
                        </p>
                        <table className="table is-bordered my-5">
                            <tbody>
                                <tr>
                                    <th>
                                        Номер поставщика
                                    </th>
                                    <td>
                                        <input
                                        type='number'
                                        placeholder={rows[0]['Номер поставщика']}
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
                                            <select name="type">
                                                <option 
                                                value="ИП"
                                                selected={rows[0]['Тип поставщика'] === "ИП"}
                                                >
                                                    ИП
                                                </option>
                                                <option 
                                                value="Самозанятый"
                                                selected={rows[0]['Тип поставщика'] === "Самозанятый"}
                                                >
                                                    Самозанятый
                                                </option>
                                                <option 
                                                value="ООО"
                                                selected={rows[0]['Тип поставщика'] === "ООО"}
                                                >
                                                    ООО
                                                </option>
                                                <option 
                                                value="АО"
                                                selected={rows[0]['Тип поставщика'] === "АО"}
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
                                            placeholder={rows[0]['Название компании']}
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
                                            placeholder={rows[0]['Номер телефона']}
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
                                            placeholder={rows[0]['Адрес']}
                                            className="input"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="tile is-child box">
                        <p className="is-size-5">
                            <strong>
                                Материалы поставщика
                            </strong>                        
                        </p>
                        <table className="table is-bordered my-5"> 

                        </table>
                    </div>
                </div>
            </form>  
        </div>
    )
}