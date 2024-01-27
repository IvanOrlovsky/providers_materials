/**
 * Функция, создающая строку параметров для URL из
 * данных измененной информации о поставщиках
 * @param providerEditData объект, содержащий изменные данные поставщика
 * @param providerMaterialsEditData объект, содержащий изменные данные материалов поставщика
 * @returns строку для вставки в качастве параметров для URL адреса
 */
export default function makeSearchParams(
	providerEditData: { [key: string]: string | object },
	providerMaterialsEditData: { [key: string]: string | object }
) {
	const searchParams = new URLSearchParams();

	Object.keys(providerEditData).forEach((key) => {
		const value = providerEditData[key];
		const stringValue =
			typeof value === "object" ? JSON.stringify(value) : String(value);
		searchParams.append(key, stringValue);
	});

	Object.keys(providerMaterialsEditData).forEach((key) => {
		const value = providerMaterialsEditData[key];
		const stringValue =
			typeof value === "object" ? JSON.stringify(value) : String(value);
		searchParams.append(key, stringValue);
	});

	const queryString = searchParams.toString();

	return queryString ? `?${queryString}` : "";
}
