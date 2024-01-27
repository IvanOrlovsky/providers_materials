"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

/**
 * Функция, осуществляющая запрос на выборку всех строк поставщиков
 */
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

/**
 * Функция, осуществляющая запрос на выборку строки
    определенного поставщика по его id
    @param id номер поставщика
 */
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

/**
 * Функция, осуществляющая запрос на выборку всех строк материалов
 */
export async function getAllMaterials() {
	noStore();

	return sql`SELECT 
    id AS "Номер материала", 
    name AS "Название материала",
    Unit_of_measure AS "Единица измерения"
    FROM material
    ORDER BY id`;
}

/**
 * Функция, осуществляющая запрос на выборку строки
    определенного материала по его id
    @param id номер материала
 */
export async function getMaterialById(id: string) {
	noStore();

	return sql`SELECT 
    m.name AS "Название материала", 
    m.unit_of_measure AS "Единица измерения"
    from material m
    WHERE m.id = ${id}
    ;`;
}

/**
 * Функция, осуществляющая запрос на выборку всех строк
    материалов, которые имеются у определенного поставщика по 
    id поставщика
    @param id номер поставщика
 */
export async function getAllMaterialsByProviderId(id: string) {
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
    ;`;
}

/**
 * Функция, осуществляющая запрос на выборку всех строк
    материалов, которые НЕ имеются у определенного поставщика по 
    id поставщика
    @param id номер поставщика
 */
export async function getNotProviderMaterials(id: string) {
	noStore();

	return sql`SELECT 
    m.id AS "Номер материала",
    m.name AS "Название материала",
    m.unit_of_measure AS "Единица измерения"
    FROM Material m
    LEFT JOIN Provider_Material pm ON m.id = pm.material_id AND pm.provider_id = ${id}
    WHERE pm.provider_id IS NULL;
    `;
}
