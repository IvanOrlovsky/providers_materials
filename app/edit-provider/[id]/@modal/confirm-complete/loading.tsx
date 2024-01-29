"use client";

import Modal from "@/components/Modal/Modal";
import { useEditProviderContext } from "@/contexts/EditProviderContext";

/**
 * Модальное окно загрузки окна об успешном изменения данных поставщика
 */
export default function Loading() {
	const context = useEditProviderContext();
	return (
		<Modal title="Загрузка" context={context}>
			<span className="loader"></span>
		</Modal>
	);
}
