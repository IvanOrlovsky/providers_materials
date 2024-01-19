"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllProviders() {
    noStore();



    return sql`
            SELECT 
                p.id AS "Номер поставщика", 
                p.type AS "Тип поставщика",
                p.name AS "Название компании",
                p.phone AS "Номер телефона",
                p.address AS "Адрес",
                sum(pm.quantity) AS "Количество материалов"
            FROM 
                provider p
                JOIN Provider_Material pm ON p.id = pm.provider_id
            GROUP BY 
                p.id
            ORDER BY 
                p.id
        `;
    
}


export async function getAllMaterials() {
    noStore();

    return sql`SELECT 
    id AS "Номер материала", 
    name AS "Название материала",
    Unit_of_measure AS "Единица измерения"
    FROM material` 
}