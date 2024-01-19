"use server";

import { getAllProviders } from "../db/queries"
import Table from "@/components/Table/table";

export default async function Providers() {
    
    let { rows } = await getAllProviders();

    return (
        <div>
            <Table entries={rows}/>
        </div>
    )
}

