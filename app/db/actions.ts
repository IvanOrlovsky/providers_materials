"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function updateProvider(providerData: {
    id: string,
    type: string,
    name: string,
    number: string,
    address: string,
}) {
    noStore();
    

    await sql`UPDATE Provider
                SET
                    name = ${providerData.name},
                    type = ${providerData.type},
                    phone = ${providerData.number},
                    address = ${providerData.address}
                WHERE
                    id = ${providerData.id};`
        


}