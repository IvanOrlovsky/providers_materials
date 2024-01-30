"use server";

import { revalidatePath } from "next/cache";
import { insertMaterial } from "@/db/actions";

/**
 * Функция действия формы для добавления в БД нового материала
 * @param FormData Данные с формы добавления материала
 */
export async function AddMaterial(FormData: FormData) {
	const name = FormData.get("materialName") as string;
	const unit_of_measure = FormData.get("materialUnitOfMeasure") as string;

	await insertMaterial(name, unit_of_measure);

	revalidatePath("/materials");
}
