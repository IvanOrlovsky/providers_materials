"use server";

import { getAllMaterials } from "../db/queries"
import Link from "next/link";

export default async function Materials() {


    let { rows } = await getAllMaterials();

    const keys = Object.keys(rows[0]);

    return (
        <div className="container content px-5">
            <ul>
                {rows.map((entry, index) => (
                    <li key={index}>
                            <span key={index}>
                                <strong>{entry[keys[1]]}</strong>{' ('}{entry[keys[2]]}{')'}
                            </span>
                    </li>
                ))}
            </ul>
            <Link href={`/edit-material`} className="button is-info">
                Редактировать
            </Link>
        </div>
    )
}