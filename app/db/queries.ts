"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function getAllProviders() {
    noStore();

    return sql` SELECT 
                id AS "Номер поставщика", 
                type AS "Тип поставщика",
                name AS "Название компании",
                phone AS "Номер телефона",
                address AS "Адрес"
                FROM provider;`;
    
}


export async function getAllMaterials() {
    noStore();

    return sql`SELECT 
    id AS "Номер материала", 
    name AS "Название материала",
    Unit_of_measure AS "Единица измерения"
    FROM material` 
}

export async function getAllMaterialsById(id: string) {
    noStore();

    return sql`SELECT 
    m.name as meterial_name, m.unit_of_measure, pm.quantity
    from provider p
    JOIN provider_material pm ON p.id = pm.provider_id
    JOIN material m ON m.id = pm.material_id
    WHERE pm.provider_id = ${id}
    ;` 
}