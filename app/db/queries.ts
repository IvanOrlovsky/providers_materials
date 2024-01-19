"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllProviders() {
    noStore();

    return sql`SELECT 
    id AS "Номер поставщика", 
    type AS "Тип поставщика",
    name AS "Название компании",
    phone AS "Номер телефона",
    address AS "Адрес"
    FROM provider` 
}