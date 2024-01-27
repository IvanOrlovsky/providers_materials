"use server";

import { getAllProviders } from "../db/queries";
import Providers_Table from "@/components/Providers_Table/Providers_Table";

/**
 * Серверная страница поставщиков
 * @returns Компонент таблицы поставщиков
 */
export default async function Providers() {
	let { rows } = await getAllProviders();

	return (
		<div>
			<Providers_Table entries={rows} />
		</div>
	);
}
