"use client";

import { useRouter } from "next/navigation";
import { updateMaterial } from "@/db/actions";
import { useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import { useEditMaterialContext } from "@/contexts/EditMaterialContext";

/**
 * Модальное окно, уведомляющее об успешном изменения данных материала
 * @param id Номер материала
 *
 */
export default function UpdateMaterialSuccess({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();

	const context = useEditMaterialContext();
	const { setIsModalOpen, materialName, materialUnitOfMeasure } = context;

	useEffect(() => {
		updateMaterial(params.id, materialName, materialUnitOfMeasure);
	}, []);

	const ModalButtons = (
		<button
			onClick={() => {
				setIsModalOpen(false);
				router.push("/materials");
			}}
			className="button is-success"
		>
			К видам материалов
		</button>
	);

	return (
		<Modal
			title="Успех"
			onDismissFunc={() => {
				router.push(`/materials`);
			}}
			context={context}
			buttons={ModalButtons}
		>
			Данные о материале успешно обновлены
		</Modal>
	);
}
