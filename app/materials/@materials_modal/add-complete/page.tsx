"use client";

import Modal from "@/components/Modal/Modal";
import { insertMaterial } from "@/db/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMaterialsContext } from "@/contexts/MaterialsContext";

/**
 * Модальное подтверждения добавления материала
 *
 */
export default function AddMaterialSuccess() {
	const router = useRouter();

	const context = useMaterialsContext();
	const { setIsModalOpen, materialName, materialUnitOfMeasure } = context;

	useEffect(() => {
		insertMaterial(materialName, materialUnitOfMeasure);
	}, []);

	const ModalButtons = (
		<button
			className="button is-success"
			onClick={() => {
				setIsModalOpen(false);
				router.push(`/materials`);
			}}
		>
			К списку материалов
		</button>
	);

	return (
		<Modal
			title="Успех"
			onDismissFunc={() => {
				router.push(`/materials`);
			}}
			buttons={ModalButtons}
			context={context}
		>
			Данные о видах материалов успешно обновлены
		</Modal>
	);
}
