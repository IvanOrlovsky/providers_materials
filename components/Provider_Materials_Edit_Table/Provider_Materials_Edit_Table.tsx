"use client";

import { getAllMaterialsByProviderId } from "@/db/queries";
import Link from "next/link";
import {
	useEffect,
	useState,
	ChangeEvent,
	Dispatch,
	SetStateAction,
} from "react";
import { QueryResultRow } from "@vercel/postgres";
import { useEditProviderContext } from "@/contexts/EditProviderContext";

/** Клеинтский компонент таблицы с вводом пользовательских новых значений для полей поставщика
    на странице /edit-provider/[id]
 * @param id id поставщика из URL адреса

 */
export default function Provider_Materials_Edit_Table({ id }: { id: string }) {
	const context = useEditProviderContext();
	const {
		materialRows,
		setMaterialRows,
		disabledRows,
		setDisabledRows,
		materialQuantities,
		setMaterialQuantities,
		setProviderMaterialDataLoadedState,
		setProviderMaterialsEditData,
	} = context;
	/**
	 * Функция, получающая из базы данных выборку материалов по номеру поставщика,
	 * а также уставнавливающая состояния
	 * setMaterialRows - вся строка материалов
	 * setMaterialQuantities - количество материалов в виде объекта вида {[key: Номер материала] : Количество}
	 * setProviderMaterialsEditData - объект, содержащий изначальные данные о материалах поставщика,
	 *      материалов поставщика, которые идут на удаление, а также измененные количества материалов поставщика
	 */
	const fetchData = async () => {
		const materialData = await getAllMaterialsByProviderId(id);
		setMaterialRows(materialData.rows);
		setMaterialQuantities(
			materialData.rows.reduce((acc, material) => {
				acc[material["Номер материала"]] = material["Количество"];
				return acc;
			}, {})
		);
		setProviderMaterialsEditData({
			prevProviderMaterialsInfo: materialData.rows,
			providerMaterialsDisabledRows: [],
			providerMaterialsQuantities: materialData.rows.reduce(
				(acc, material) => {
					acc[material["Номер материала"]] = material["Количество"];
					return acc;
				},
				{}
			),
		});

		setProviderMaterialDataLoadedState(true);
	};

	/**
	 * Функция, которая обрабатывает изменение вводных данных количества материалов
	 * @param material_id Номер материала
	 * @param quantity Количество материала
	 */
	const handleQuantityChange = (material_id: string, quantity: string) => {
		setMaterialQuantities((prevQuantities) => ({
			...prevQuantities,
			[material_id]: quantity,
		}));
		setProviderMaterialsEditData((prevData: any) => ({
			...prevData,
			providerMaterialsQuantities: {
				...materialQuantities,
				[material_id]: quantity,
			},
		}));
	};

	/**
	 * Функция, которая обрабатывает добавление материалов в очередь на удаление
	 * @param material_id Номер материала
	 */
	const handleMaterialDelete = (material_id: string) => {
		if (disabledRows.includes(material_id)) {
			const newDisabledRows = disabledRows.filter(
				(obj) => obj !== material_id
			);
			setDisabledRows(newDisabledRows);
			setProviderMaterialsEditData((prevData: any) => ({
				...prevData,
				providerMaterialsDisabledRows: newDisabledRows,
			}));
		} else {
			setDisabledRows([...disabledRows, material_id]);
			setProviderMaterialsEditData((prevData: any) => ({
				...prevData,
				providerMaterialsDisabledRows: [...disabledRows, material_id],
			}));
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<>
			<table className="table is-bordered my-5">
				<tbody>
					{materialRows.map((material) => (
						<tr
							key={material["Номер материала"]}
							style={
								disabledRows.includes(
									material["Номер материала"]
								)
									? { backgroundColor: "rgba(0, 0, 0, 0.5)" }
									: {}
							}
						>
							<th className="">
								{material["Название материала"]}
								{" ("}
								{material["Единица измерения"]}
								{")"}
							</th>
							<td>
								<input
									name="materialQuantity"
									type="number"
									defaultValue={material["Количество"]}
									placeholder={material["Количество"]}
									disabled={disabledRows.includes(
										material["Номер материала"]
									)}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) => {
										const quantity = e.target.value;
										handleQuantityChange(
											material["Номер материала"],
											quantity
										);
									}}
									required
								></input>
							</td>
							<td>
								<button
									className={
										disabledRows.includes(
											material["Номер материала"]
										)
											? "button is-warning"
											: "button is-danger"
									}
									type="button"
									onClick={() => {
										handleMaterialDelete(
											material["Номер материала"]
										);
									}}
								>
									{disabledRows.includes(
										material["Номер материала"]
									)
										? "Оставить"
										: "Удалить"}
								</button>
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={3}>
							<Link
								href={`/edit-provider/${id}/add-material`}
								className="button is-info is-fullwidth"
							>
								Добавить материал
							</Link>
						</td>
					</tr>
				</tfoot>
			</table>
		</>
	);
}
