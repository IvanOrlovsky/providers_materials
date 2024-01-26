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
                FROM provider
                ORDER BY id;`;
    
}

export async function getProviderById(id: string) {
    noStore();

    return sql` SELECT 
                id AS "Номер поставщика", 
                type AS "Тип поставщика",
                name AS "Название компании",
                phone AS "Номер телефона",
                address AS "Адрес"
                FROM provider
                WHERE id = ${id};`;
    
}


export async function getAllMaterials() {
    noStore();

    return sql`SELECT 
    id AS "Номер материала", 
    name AS "Название материала",
    Unit_of_measure AS "Единица измерения"
    FROM material
    ORDER BY id` 
}

export async function getAllMaterialsById(id: string) {
    noStore();

    return sql`SELECT 
    m.id AS "Номер материала",
    m.name AS "Название материала", 
    m.unit_of_measure AS "Единица измерения", 
    pm.quantity AS "Количество"
    from provider p
    JOIN provider_material pm ON p.id = pm.provider_id
    JOIN material m ON m.id = pm.material_id
    WHERE pm.provider_id = ${id}
    ;` 
}

export async function getNotProviderMaterials(id: string) {
    noStore();

    return sql`SELECT 
    m.id AS "Номер материала",
    m.name AS "Название материала",
    m.unit_of_measure AS "Единица измерения"
    FROM Material m
    LEFT JOIN Provider_Material pm ON m.id = pm.material_id AND pm.provider_id = ${id}
    WHERE pm.provider_id IS NULL;
    `
}

export async function addMaterialToProvider(provider_id: string, material_id: string, quantity: string) {
    noStore();

    return sql`INSERT INTO Provider_Material (provider_id, material_id, quantity)
    VALUES (${provider_id}, ${material_id}, ${quantity});
    `
}