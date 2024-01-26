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

export async function updateProviderMaterial(material_id: string, provider_id: string, quantity: string) {
    noStore();

    await sql`UPDATE Provider_Material
                SET quantity = ${quantity}
                WHERE provider_id = ${provider_id} AND material_id = ${material_id};
                `
}

export async function deleteMaterial(material_id: string, provider_id: string) {
    noStore();

    await sql`DELETE FROM Provider_Material
                WHERE provider_id = ${provider_id} AND material_id = ${material_id};
                `
}

