"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { updateMaterial } from "@/db/actions";
import { useEffect } from "react";
import Modal from "@/components/Modal/Modal";

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
	const searchParams = useSearchParams();

	useEffect(() => {
		updateMaterial(
			params.id,
			searchParams.get("name") as string,
			searchParams.get("unitOfMeasure") as string
		);
	}, []);

	return (
		<Modal
			title="Успех"
			onDismissFunc={() => {
				router.push(`/materials/${1}`);
			}}
		>
			<section className="modal-card-body">
				Данные о материале успешно обновлены
			</section>
			<footer className="modal-card-foot">
				<Link href={`/materials/${1}`} className="button is-success">
					К видам материалов
				</Link>
			</footer>
		</Modal>
	);
}
