"use client";

import Modal from "@/components/Modal/Modal";
import { useEditMaterialContext } from "@/contexts/EditMaterialContext";

/**
 * Модальное окно для загрузки окна уведомления о неудаче удаления материала
 * в связи с наличием материала у одного из поставщиков
 */
export default function DeleteFailedLoading() {
	const context = useEditMaterialContext();
	return (
		<Modal title="Загрузка" context={context}>
			<span className="loader"></span>
		</Modal>
	);
}
