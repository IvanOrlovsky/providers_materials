/**
 * Функция, которая нестрого проверяет равенство объектов
 * @param obj1 Первый объект для сравнения
 * @param obj2 Второй объект для сравнения
 * @returns Равны ли объекты
 */
export default function areObjectsEqual(
	obj1: Record<string, any>,
	obj2: Record<string, any>
): boolean {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (!(key in obj2) || obj1[key] != obj2[key]) {
			return false;
		}
	}

	return true;
}
