"use client";

import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { useEditMaterialContext } from "@/contexts/EditMaterialContext";

/**
 * Модальное окно для уведомления о неудаче удаления материала
 * в связи с наличием материала у одного из поставщиков
 */
export default function DeleteMaterialFailed() {
	const router = useRouter();

	const { setIsModalOpen } = useEditMaterialContext();

	const ModalButtons = (
		<button
			onClick={() => {
				setIsModalOpen(false);
				router.push(`/materials`);
			}}
			className="button is-success"
		>
			К видам материалов
		</button>
	);

	return (
		<Modal
			title="Ошибка"
			onDismissFunc={() => {
				router.push(`/materials`);
			}}
			buttons={ModalButtons}
		>
			<p>
				Не удалось удалить материал, так как он имеется в наличии у
				поставщиков. Удаление невозможно.
			</p>
		</Modal>
	);
}
