"use server";

import { getAllProviders } from "../db/queries"

export default async function Providers() {
    let { rows } = await getAllProviders();

    return (
        <div>
            <h1>Поставщики</h1>
            <p>
                {JSON.stringify(rows)}
            </p>
            <p>

            </p>
        </div>
    )
}

