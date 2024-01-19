"use server";

import { getAllMaterials } from "../db/queries"


export default async function Materials() {


    let { rows } = await getAllMaterials();

    const keys = Object.keys(rows[0]);

    return (
        <div className="container content">
            <ul>
                {rows.map((entry, index) => (
                                <li key={index}>
                                        <span key={index}>
                                            <strong>{entry[keys[1]]}</strong>{' ('}{entry[keys[2]]}{')'}
                                        </span>
                                </li>
                            ))}
            </ul>
        </div>
    )
}