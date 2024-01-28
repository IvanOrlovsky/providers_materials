"use client";

import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { useMaterialsContext } from "@/contexts/MaterialsContext";

/**
 * Модальное окно с формой добавления нового материала
 *
 */
export default function AddMaterial() {
	const router = useRouter();

	const MaterialsContext = useMaterialsContext();
	const {
		materialName,
		materialUnitOfMeasure,
		setIsModalOpen,
		setMaterialName,
		setMaterialUnitOfMeasure,
	} = MaterialsContext;

	const ModalButtons = (
		<button
			className="button is-success"
			type="submit"
			form="AddMaterialForm"
		>
			Добавить
		</button>
	);

	return (
		<Modal
			title="Добавить новый материал"
			buttons={ModalButtons}
			context={MaterialsContext}
		>
			<form
				id="AddMaterialForm"
				onSubmit={(e) => {
					e.preventDefault();
					setIsModalOpen(false);
					router.push(`/materials/add-complete`);
				}}
			>
				<table className="table is-hoverable is-bordered">
					<tbody>
						<tr>
							<th>Название материала</th>
							<th>Единица измерения</th>
						</tr>
						<tr>
							<td>
								<input
									name="materialName"
									className="input"
									value={materialName}
									onChange={(e) => {
										setMaterialName(e.target.value);
									}}
									required
								></input>
							</td>
							<td>
								<input
									name="materialUnitOfMeasure"
									className="input"
									value={materialUnitOfMeasure}
									onChange={(e) => {
										setMaterialUnitOfMeasure(
											e.target.value
										);
									}}
									required
								></input>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</Modal>
	);
}
