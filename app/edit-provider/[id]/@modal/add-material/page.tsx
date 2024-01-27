"use client";

import Modal from "@/components/Modal/Modal";
import { useEffect, useState } from "react";
import { getNotProviderMaterials } from "@/db/queries";
import { QueryResultRow } from "@vercel/postgres";
import { insertMaterialToProvider } from "@/db/actions";
import { useRouter } from "next/navigation";

/**
 * Модальное окно добавления материала для поставщика
 * @param id Номер поставщика
 *
 */
export default function AddProviderMaterial({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();

	const [materialsData, setMaterialsData] = useState<QueryResultRow[]>([]);
	const [materialQuantities, setMaterialQuantities] = useState<{
		[key: string]: string;
	}>({});
	const [materialsDataChanged, setMaterialsDataChanged] = useState(false);

	useEffect(() => {
		/**
		 * Функция, забирающая выборку всех строк материалов, которые НЕ имеются у определенного поставщика по id поставщика
		 * и изменяющая состояние данных материалов, вместе с введенными количествами материалов
		 */
		const fetchData = async () => {
			const data = await getNotProviderMaterials(params.id);
			setMaterialsData(data.rows);
			setMaterialQuantities({});
		};
		fetchData();
	}, [params.id, materialsDataChanged]);

	/**
	 * Функция, обрабатывающая изменение ввода количеств материалов
	 * и изменяющая состояние данных введенных количеств материалов
	 */
	const handleQuantityChange = (materialNumber: string, quantity: string) => {
		setMaterialQuantities((prevQuantities) => ({
			...prevQuantities,
			[materialNumber]: quantity,
		}));
	};

	/**
	 * Функция, обрабатывающая добавление материала в таблицу
	 * и изменяющая состояние переменной изменнных данных
	 * Это нужно для вызова useEffect для ререндера списка материалов
	 */
	const handleAddMaterial = (material_id: string) => {
		insertMaterialToProvider(
			params.id,
			material_id,
			materialQuantities[material_id]
		);

		setMaterialsDataChanged(!materialsDataChanged);
	};

	return (
		<Modal title="Добавить новый материал">
			<section className="modal-card-body">
				<h1>Выберите материалы из списка:</h1>
				<br />
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<table className="table is-hoverable is-bordered">
						<tbody>
							<tr>
								<th>Название материала</th>
								<th>Единица измерения</th>
								<th>Количество</th>
							</tr>
							{materialsData.map((material) => (
								<tr key={material["Номер материала"]}>
									<th
										className={
											materialQuantities[
												material["Номер материала"]
											]
												? "has-background-success"
												: ""
										}
									>
										{material["Название материала"]}
									</th>
									<td
										className={
											materialQuantities[
												material["Номер материала"]
											]
												? "has-background-success"
												: ""
										}
									>
										{material["Единица измерения"]}
									</td>
									<td
										className={
											materialQuantities[
												material["Номер материала"]
											]
												? "has-background-success"
												: ""
										}
									>
										<input
											type="number"
											value={
												materialQuantities[
													material["Номер материала"]
												] || ""
											}
											onChange={(e) =>
												handleQuantityChange(
													material["Номер материала"],
													e.target.value
												)
											}
										></input>
									</td>

									{materialQuantities[
										material["Номер материала"]
									] ? (
										<td>
											<button
												type="button"
												className="button is-info"
												onClick={() =>
													handleAddMaterial(
														material[
															"Номер материала"
														]
													)
												}
											>
												Добавить
											</button>
										</td>
									) : (
										<></>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</form>
			</section>
			<footer className="modal-card-foot">
				<button
					className="button is-info"
					onClick={() => {
						alert(
							"Необходимо будет обновить страницу редактирования, чтобы изменения вступили в силу."
						);
						router.back();
					}}
				>
					Вернуться к редактированию поставщика
				</button>
			</footer>
		</Modal>
	);
}
