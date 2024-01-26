"use client"

import Modal from "@/components/Modal/Modal";
import { useEffect, useState } from "react";
import { getNotProviderMaterials } from "@/app/db/queries";
import { QueryResultRow } from "@vercel/postgres";
import { addMaterialToProvider } from "@/app/db/queries";
import { useRouter } from "next/navigation";


export default function AddMaterial({ params } : { params: { id: string } }){

    const router = useRouter();

    const [materialsData, setMaterialsData] = useState<QueryResultRow[]>([]);
    const [materialQuantities, setMaterialQuantities] = useState<{ [key: string]: string }>({});
    const [materialsDataChanged, setMaterialsDataChanged] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getNotProviderMaterials(params.id);
            setMaterialsData(data.rows);
            setMaterialQuantities({});
        }
        fetchData();
    }, [params.id, materialsDataChanged])


    const handleQuantityChange = (materialNumber: string, quantity: string) => {
        setMaterialQuantities((prevQuantities) => ({
            ...prevQuantities,
            [materialNumber]: quantity,
        }));
    };

    const handleAddMaterial = (material_id: string) => {
        addMaterialToProvider(params.id, material_id, materialQuantities[material_id]);
        
        setMaterialsDataChanged(!materialsDataChanged)
    }

    return (
        <Modal
        title="Добавить новый материал"
        >
            <section className="modal-card-body">
                <h1>
                    Выберите материалы из списка:
                </h1>
                <br/>
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <table className="table is-hoverable is-bordered">
                        <tbody>
                            <tr>
                                <th>
                                    Название материала
                                </th>
                                <th>
                                    Единица измерения
                                </th>
                                <th>
                                    Количество
                                </th>
                            </tr>
                            {materialsData.map((material) => (
                                <tr 
                                key={material['Номер материала']}                                
                                >
                                    <th
                                    className={(materialQuantities[material['Номер материала']]) ? "has-background-success" : ""}
                                    >
                                        {material['Название материала']}
                                    </th>
                                    <td
                                    className={(materialQuantities[material['Номер материала']]) ? "has-background-success" : ""}
                                    >
                                        {material['Единица измерения']}
                                    </td>
                                    <td
                                    className={(materialQuantities[material['Номер материала']]) ? "has-background-success" : ""}
                                    >
                                        <input
                                        type="number"
                                        value={materialQuantities[material['Номер материала']] || ''}
                                        onChange={(e) => handleQuantityChange(material['Номер материала'], e.target.value)}
                                        >
                                        </input>
                                    </td>

                                    {materialQuantities[material['Номер материала']] 
                                    ?   <td>
                                            <button
                                            type='button'
                                            className="button is-info"
                                            onClick={() => (handleAddMaterial(material['Номер материала']))}
                                            >
                                                Добавить
                                            </button>
                                        </td>
                                    : <></>} 

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </section>
            <footer className="modal-card-foot">
                <button className="button is-info" onClick={() => {
                    
                    router.back();
                }}>
                    Вернуться к редактированию поставщика
                </button>
            </footer>
        </Modal>
    )
}