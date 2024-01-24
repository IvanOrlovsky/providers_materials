"use client"

import { getAllMaterialsById } from "@/app/db/queries"
import Link from "next/link"
import { useEffect, useState } from "react"
import { QueryResultRow } from "@vercel/postgres"

export default function Provider_Materials_Edit_Table({ id }: {id: string}){

    const [materialRows, setMaterialRows] = useState<QueryResultRow[]>([]);
    const [disabledRows, setDisabledRows] = useState<string[]>([]);

    const fetchData = async () => {
        const materialData = await getAllMaterialsById(id);
        setMaterialRows(materialData.rows);
        
      };

    
    const handleMaterialDelete = (material_id: string) => {
        if (disabledRows.includes(material_id)) {
            setDisabledRows(disabledRows.filter(obj => obj !== material_id));
        } else {
            setDisabledRows([...disabledRows, material_id]);
        }
    }


    useEffect(() => {
        fetchData();
    }, [id])

    
    return (
        <table className="table is-bordered my-5"> 
            <tbody>
                {materialRows.map((material) => (
                    <tr
                    key={material["Номер материала"]}
                    style={disabledRows.includes(material["Номер материала"]) ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : {}}
                    >
                        <th className="">
                            {material["Название материала"]}
                        </th>
                        <td>
                            <input
                            name="materialQuantity"
                            type='number'
                            placeholder={material["Количество"]}
                            disabled={disabledRows.includes(material["Номер материала"])}
                            >
                            </input>
                        </td>
                        <td>
                                <button
                                className={disabledRows.includes(material["Номер материала"]) ? "button is-warning" : "button is-danger"}
                                type="button"
                                onClick={() => {handleMaterialDelete(material["Номер материала"])}}
                                >
                                    {disabledRows.includes(material["Номер материала"]) ? "Оставить" : "Удалить"}
                                </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) 
}