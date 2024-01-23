import { getAllMaterialsById } from "@/app/db/queries"
import DeleteProviderMaterialBtn from "../DeleteProviderMaterialBtn/DeleteProviderMaterialBtn"
import Link from "next/link"

export default async function Provider_Materials_Edit_Table({ id }: {id: string}){

    let material_data = await getAllMaterialsById(id)
    let material_rows = material_data.rows

    

    return (
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
                            <Link className="has-text-white-bis" href={`/edit-provider/${id}?showModal=y`}>
                                <DeleteProviderMaterialBtn id={id}/>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) 
}