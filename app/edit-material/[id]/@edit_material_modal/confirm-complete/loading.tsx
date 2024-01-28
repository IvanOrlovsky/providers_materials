"use client";

import Modal from "@/components/Modal/Modal";
import { useEditMaterialContext } from "@/contexts/EditMaterialContext";

/**
 * Модальное окно загрузки окна об успешном изменения данных материала
 */
export default function Loading() {
	const context = useEditMaterialContext();
	return (
		<Modal title="Загрузка" context={context}>
			<span className="loader"></span>
		</Modal>
	);
}
