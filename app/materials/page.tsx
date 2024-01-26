"use client";

import { getAllMaterials } from "../db/queries"
import Link from "next/link";
import { useEffect, useState } from "react";
import { QueryResultRow } from "@vercel/postgres";

export default function Materials() {

    const [materialsData, setMaterialsData] = useState<QueryResultRow[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllMaterials();
            console.log(data)
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
                    </li>
                ))}
            </ul>
            <Link href={`/materials/add-material`} className="button is-warning">
                Добавить материал
            </Link> 
            <Link href={`/edit-material`} className="button is-info">
                Редактировать
            </Link>
        </div>
    )
}