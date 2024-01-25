"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function updateProvider(providerData: {providerData: {
    providerId: string,
    providerType: string,
    providerName: string,
    providerNumber: string,
    providerAddress: string,
}}) {
    noStore();

    try {
        await sql``
        
    } catch(error) {

    }
}