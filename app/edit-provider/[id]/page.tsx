import { getAllMaterialsById } from "@/app/db/queries"
import Provider_Edit_Table from "@/components/Provider_Edit_Table/Provider_Edit_Table"

export default async function EditProvider({ params } : { params: { id: string } }) {

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
                        <Provider_Edit_Table id={params.id}/>
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
                                        <td>
                                            <button>

                                            </button>
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