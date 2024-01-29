"use client";

import Modal from "@/components/Modal/Modal";
import { useEditProviderContext } from "@/contexts/EditProviderContext";
import { deleteProvider } from "@/db/actions";
import { useRouter } from "next/navigation";

/**
 * Модальное окно подтверждения удаления поставщика
 * @param params Номер поставщика
 *
 */
export default function DeleteProviderConfirmation({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();

	const context = useEditProviderContext();
	const { setIsModalOpen } = context;

	const handleProviderDelete = (provider_id: string) => {
		deleteProvider(provider_id);
		router.push(`/providers`);
	};

	const ModalButtons = (
		<button
			type="button"
			className="button is-danger"
			onClick={() => {
				setIsModalOpen(false);
				handleProviderDelete(params.id);
			}}
		>
			Удалить поставщика
		</button>
	);
	return (
		<Modal
			title={`Удаление поставщика ${params.id}`}
			context={context}
			buttons={ModalButtons}
		>
			<p>
				Вы уверены, что хотите удалить поставщика? Это действие
				необратимо.
			</p>
		</Modal>
	);
}
