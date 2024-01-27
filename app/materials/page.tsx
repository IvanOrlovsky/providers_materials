"use client";

import { getAllMaterials } from "../db/queries"
import Link from "next/link";
import { useEffect, useState } from "react";
import { QueryResultRow } from "@vercel/postgres";

/**
 * Клиентская страница списка материалов
 * 
 */
export default function Materials() {

    const [materialsData, setMaterialsData] = useState<QueryResultRow[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllMaterials();
            setMaterialsData(data.rows);
        }
        fetchData();
    }, [])
    

    return (
        <div className="container content px-5">
            <ul>
                {materialsData.map((material, index) => (
                    <li key={index}>
                            <span key={index}>
                                <strong>{material['Название материала']}</strong>{' ('}{material['Единица измерения']}{')'}
                            </span>
                            <Link href={`/edit-material/${material['Номер материала']}`} className="button is-info is-small mx-4    ">
                                Редактировать
                            </Link>
                    </li>
                ))}
            </ul>
            <Link href={`/materials/add-material?data=${JSON.stringify(materialsData)}`} as="/materials/add-material" className="button is-warning">
                Добавить материал
            </Link> 
        </div>
    )
}