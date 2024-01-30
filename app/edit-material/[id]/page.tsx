"use client";

import { useEffect } from "react";
import { getMaterialById } from "../../../db/queries";
import Link from "next/link";
import { useEditMaterialContext } from "@/contexts/EditMaterialContext";

/**
 * Клиентская страница редактирования конкретного материала
 * @param id Номер материала
 * @returns Таблицу с вводами названия материала и единиц измерения
 */
export default function EditMaterial({ params }: { params: { id: string } }) {
	const context = useEditMaterialContext();

	const {
		prevMaterialInfo,
		setPrevMaterialsInfo,
		materialName,
		setMaterialName,
		materialUnitOfMeasure,
		setMaterialUnitOfMeasure,
	} = context;

	useEffect(() => {
		const fetchData = async () => {
			const { rows } = await getMaterialById(params.id);

			setPrevMaterialsInfo(rows[0]);
			setMaterialName(rows[0]["Название материала"]);
			setMaterialUnitOfMeasure(rows[0]["Единица измерения"]);
		};

		fetchData();
	}, [params.id]);

	return (
		<div className="container my-5">
			<h1 className="title has-text-centered">{`Редактирование материала ${params.id}`}</h1>
			<section className="section">
				<div className="container">
					<div className="columns is-centered">
						<table className="table is-narrow is-bordered is-boxed">
							<thead>
								<tr>
									<th>Номер материала</th>
									<th>Название материала</th>
									<th>Единица измерения</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{params.id}</td>
									<td>
										<input
											type="text"
											className="input"
											placeholder={
												prevMaterialInfo[
													"Название материала"
												]
											}
											value={materialName}
											onChange={(e) => {
												setMaterialName(e.target.value);
											}}
											required
										/>
									</td>
									<td>
										<input
											type="text"
											className="input"
											placeholder={
												prevMaterialInfo[
													"Единица измерения"
												]
											}
											value={materialUnitOfMeasure}
											onChange={(e) => {
												setMaterialUnitOfMeasure(
													e.target.value
												);
											}}
											required
										/>
									</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td colSpan={3}>
										{materialName !== "" &&
										materialUnitOfMeasure !== "" ? (
											<Link
												href={`/edit-material/${params.id}/confirmation?prevName=${prevMaterialInfo["Название материала"]}&prevUnitOfMeasure=${prevMaterialInfo["Единица измерения"]}&name=${materialName}&unitOfMeasure=${materialUnitOfMeasure}`}
												className="button is-warning is-fullwidth"
											>
												Сохранить изменения
											</Link>
										) : (
											<button className="button is-warning is-fullwidth is-loading"></button>
										)}
									</td>
								</tr>
								<tr>
									<td colSpan={3}>
										<Link
											href={`/edit-material/${params.id}/delete-confirmation`}
											className="button is-danger is-fullwidth has-text-weight-bold"
										>
											Удалить материал
										</Link>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</section>
		</div>
	);
}
