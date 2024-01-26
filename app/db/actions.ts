"use server";

import { sql, QueryResultRow } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

/**
 * Функция, осуществляющая запрос на обновление данных поставщика по его id
 * @param providerData объект данных о поставщике
 */
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

/**
 * Функция, осуществляющая запрос на обновление данных о связанных с поставщиком
    материалах по id материала и поставщика
 * @param material_id номер материала
    @param provider_id номер поставщика
    @param quantity количество материала у поставщика
 */
export async function updateProviderMaterial(material_id: string, provider_id: string, quantity: string) {
    noStore();

    await sql`UPDATE Provider_Material
                SET quantity = ${quantity}
                WHERE provider_id = ${provider_id} AND material_id = ${material_id};
                `
}

/**
 * Функция, осуществляющая запрос на обновление данных о материале
    по его id 
 * @param id номер материала
    @param name название материала
    @param unit_of_measure единица измерения материала
 */
export async function updateMaterial(id: string, name: string, unit_of_measure: string) {
    noStore();

    await sql`UPDATE material
                SET name = ${name},
                    unit_of_measure = ${unit_of_measure}
                    WHERE id = ${id};
                `
}

/**
 * Функция, осуществляющая запрос на вставку строки нового материала
    @param name название материала
    @param unit_of_measure единица измерения материала
 */
export async function insertMaterial(name: string, unit_of_measure: string) {
    noStore();

    await sql`INSERT INTO Material (name, unit_of_measure)
                VALUES (${name}, ${unit_of_measure});
                `
}

/**
 * Функция, осуществляющая запрос на вставку строки новой связи поставщика с материалом
    @param provider_id номер поставщика
    @param material_id номер материала
    @param quantity количество материала
 */
export async function insertMaterialToProvider(provider_id: string, material_id: string, quantity: string) {
    noStore();

    return sql`INSERT INTO Provider_Material (provider_id, material_id, quantity)
    VALUES (${provider_id}, ${material_id}, ${quantity});
    `
}


/**
 * Функция, осуществляющая запрос на удаление связи поставщика с материалом
    по id материала и поставщика
    @param provider_id номер поставщика
    @param material_id номер материала
 */
export async function deleteProviderMaterial(material_id: string, provider_id: string) {
    noStore();

    await sql`DELETE FROM Provider_Material
                WHERE provider_id = ${provider_id} AND material_id = ${material_id};
                `
}

/**
 * Функция, осуществляющая запрос на удаление поставщика по его id
    @param id номер поставщика
 */
export async function deleteProvider(id: string) {
    noStore();

    await sql`DELETE FROM Provider
                WHERE id = ${id};
                `
}

/**
 * Функция, осуществляющая запрос на удаление материала по его id
    @param id номер материала
 */
export async function deleteMaterial(id: string): Promise<void> {
    noStore();

    try {
        const hasAssociations: QueryResultRow = await sql`SELECT EXISTS (
            SELECT 1
            FROM Provider_Material
            WHERE material_id = ${id}
        ) AS has_associations;`;

        if (hasAssociations.rows[0].has_associations) {
            return Promise.reject("Material has associations");
        }

        await sql`DELETE FROM Material WHERE id = ${id};`;

        return Promise.resolve();
    } catch (error) {
        console.error("Error in deleteMaterial:", error);
        return Promise.reject(error);
    }
}
