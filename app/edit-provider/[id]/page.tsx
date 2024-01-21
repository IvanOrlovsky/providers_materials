import { getProviderById } from "@/app/db/queries"


export default async function EditProvider({ params } : { params: { id: string } }) {

    let { rows } = await getProviderById(params.id)

    const keys = Object.keys(rows[0]); 

    return (
        <form className="container my-5">
            <div className="tile is-ancestor">
                <div className="tile is-child box">
                    <p className="is-size-5">
                        <strong>
                            Информация о поставщике номер {params.id}
                        </strong>                        
                    </p>
                    <table className="table is-bordered my-3">
                        {keys.map((key: string) => (
                            <tr>
                                <th>
                                    {key}
                                </th>
                                <td>
                                    {rows[0][key]}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="tile is-child box">
                    <p className="is-size-5">
                        <strong>
                            Материалы поставщика номер {params.id}
                        </strong>                        
                    </p>
                </div>
            </div>
        </form>
    )
}