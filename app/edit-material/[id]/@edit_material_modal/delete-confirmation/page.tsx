"use client";

import Modal from "@/components/Modal/Modal";
import { deleteMaterial } from "@/db/actions";
import { useRouter } from "next/navigation";
import { useEditMaterialContext } from "@/contexts/EditMaterialContext";

/**
 * Модальное окно для подтверждения удаления материала
 * @param id Номер материала
 */
export default function DeleteMaterialConfirmation({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();

	const context = useEditMaterialContext();
	const { setIsModalOpen } = context;

	const handleDelete = (material_id: string) => {
		deleteMaterial(material_id)
			.then(() => {
				setIsModalOpen(false);
				router.push(`/materials`);
			})
			.catch(() => {
				setIsModalOpen(false);
				router.push(`/edit-material/${params.id}/delete-failed`);
			});
	};

	const ModalButtons = (
		<button
			type="button"
			className="button is-danger"
			onClick={() => {
				handleDelete(params.id);
			}}
		>
			Удалить материал
		</button>
	);

	return (
		<Modal
			title={`Удаление материала ${params.id}`}
			buttons={ModalButtons}
			context={context}
		>
			<p>
				Вы уверены, что хотите удалить материал? Это действие
				необратимо.
			</p>
		</Modal>
	);
}
