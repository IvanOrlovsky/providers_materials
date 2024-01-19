"use server";

import { getAllProviders } from "../db/queries"
import Table from "@/components/Table/table";

export default async function Providers() {
    let { rows } = await getAllProviders();

    return (
        <div>
            <h1>Поставщики</h1>
            <p>
                {JSON.stringify(rows)}
            </p>
            <Table entries={rows}/>
        </div>
    )
}

