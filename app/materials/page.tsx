"use server";

import { getAllMaterials } from "../../db/queries";
import Link from "next/link";
import AddMaterialForm from "@/components/Add_Material_Form/AddMaterialForm";

/**
 * Серверная страница списка материалов
 *
 */
export default async function Materials() {
	const { rows } = await getAllMaterials();

	return (
		<div className="container content px-5">
			<ul>
				{rows.map((material, index) => (
					<li key={index}>
						<span key={index}>
							<strong>{material["Название материала"]}</strong>
							{" ("}
							{material["Единица измерения"]}
							{")"}
						</span>
						<Link
							href={`/edit-material/${material["Номер материала"]}`}
							className="button is-info is-small mx-4"
						>
							Редактировать
						</Link>
					</li>
				))}
			</ul>
			<AddMaterialForm />
		</div>
	);
}
