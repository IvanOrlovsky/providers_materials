"use client"

import { useEffect, useState } from "react"
import { getAllMaterials } from "../db/queries"
import Link from "next/link";

export default function EditMaterial() {
    const [materialsInfo, setMaterialsInfo] = useState<Record<string, string>[]>([]);
    const [materialsNames, setMaterialsNames] = useState<Record<string, string>>({});
    const [materialsUnitsOfMeasure, setMaterialsUnitsOfMeasure] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchData = async () => {
            const { rows } = await getAllMaterials();
            setMaterialsInfo(rows);

            const names = rows.reduce((acc, material) => {
                acc[material['Номер материала']] = material['Название материала'];
                return acc;
            }, {});
            setMaterialsNames(names);

            const unitsOfMeasure = rows.reduce((acc, material) => {
                acc[material['Номер материала']] = material['Единица измерения'];
                return acc;
            }, {});
            setMaterialsUnitsOfMeasure(unitsOfMeasure);
        };

        fetchData();
    }, []);

    const handleMaterialNameChange = (material_id: string, name: string) => {
        setMaterialsNames(prevNames => ({
            ...prevNames,
            [material_id]: name
        }));
    }

    const handleMaterialUnitsOfMeasureChange = (material_id: string, unit_of_measure: string) => {
        setMaterialsUnitsOfMeasure(prevsUnitsOfMeasure => ({
            ...prevsUnitsOfMeasure,
            [material_id]: unit_of_measure
        }));
    }



    return (
        <div className="container my-5">
            <h1 className="title has-text-centered">
                Редактирование материалов
            </h1>
            <section className="section">
                <div className="container">
                    <div className="columns is-centered">
                        <table className="table is-narrow is-bordered is-boxed">
                            <thead>
                                <tr>
                                    <th>Номер материала</th>
                                    <th>Название материала</th>
                                    <th>Единица измерения</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materialsInfo.map((material) => (
                                    <tr key={material['Номер материала']}>
                                        <td>{material['Номер материала']}</td>
                                        <td>
                                            <input
                                                type='text'
                                                className="input"
                                                placeholder={material['Название материала']}
                                                value={materialsNames[material['Номер материала']]}
                                                onChange={(e) => {handleMaterialNameChange(material['Номер материала'], e.target.value)}}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='text'
                                                className="input"
                                                placeholder={material['Единица измерения']}
                                                value={materialsUnitsOfMeasure[material['Номер материала']]}
                                                onChange={(e) => {handleMaterialUnitsOfMeasureChange(material['Номер материала'], e.target.value)}}
                                                required
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3}>
                                        {(Object.keys(materialsNames).length > 0 && Object.keys(materialsUnitsOfMeasure).length > 0) ? 
                                            <Link href={``} className="button is-warning is-fullwidth">
                                                Сохранить изменения
                                            </Link>
                                            : 
                                            <button className="button is-warning is-fullwidth is-loading"></button>
                                        }
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>  
                </div>
            </section>
        </div>
    )
}