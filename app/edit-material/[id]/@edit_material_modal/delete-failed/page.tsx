"use client";

import Link from "next/link";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

/**
 * Модальное окно для уведомления о неудаче удаления материала
 * в связи с наличием материала у одного из поставщиков
 */
export default function DeleteMaterialFailed() {
	const router = useRouter();

	return (
		<Modal
			title="Ошибка"
			onDismissFunc={() => {
				router.push(`/materials/${1}`);
			}}
		>
			<section className="modal-card-body has-background-danger has-text-white-bis">
				<p>
					Не удалось удалить материал, так как он имеется в наличии у
					поставщиков. Удаление невозможно.
				</p>
			</section>
			<footer className="modal-card-foot">
				<Link href={`/materials/${1}`} className="button is-success">
					К видам материалов
				</Link>
			</footer>
		</Modal>
	);
}
