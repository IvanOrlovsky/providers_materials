"use client";

import Modal from "@/components/Modal/Modal";
import { insertMaterial } from "@/db/actions";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMaterialsContext } from "@/contexts/MaterialsContext";

/**
 * Модальное подтверждения добавления материала
 *
 */
export default function AddMaterialSuccess() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { setIsModalOpen } = useMaterialsContext();

	useEffect(() => {
		const name = searchParams.get("materialName") as string;
		const unit_of_measure = searchParams.get(
			"materialUnitOfMeasure"
		) as string;
		insertMaterial(name, unit_of_measure);
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
		>
			Данные о видах материалов успешно обновлены
		</Modal>
	);
}
