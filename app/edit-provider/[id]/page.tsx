import { getProviderById } from "@/app/db/queries"
import { getAllMaterialsById } from "@/app/db/queries"

export default async function EditProvider({ params } : { params: { id: string } }) {

    let providers_data = await getProviderById(params.id)
    let providers_rows = providers_data.rows[0]

    let material_data = await getAllMaterialsById(params.id)
    let material_rows = material_data.rows

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
                                        placeholder={providers_rows['Номер поставщика']}
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
                                            defaultValue={providers_rows['Тип поставщика']}
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
                                            placeholder={providers_rows['Название компании']}
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
                                            placeholder={providers_rows['Номер телефона']}
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
                                            placeholder={providers_rows['Адрес']}
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
                            <tbody>
                                {material_rows.map((material, index) => (
                                    <tr key={index}>
                                        <th>
                                            {material["Название материала"]}
                                        </th>
                                        <td>
                                            <input
                                            type='text'
                                            placeholder={material["Единица измерения"]}
                                            >
                                            </input>
                                        </td>
                                        <td>
                                            <input
                                            type='number'
                                            placeholder={material["Количество"]}
                                            >
                                            </input>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>  
        </div>
    )
}