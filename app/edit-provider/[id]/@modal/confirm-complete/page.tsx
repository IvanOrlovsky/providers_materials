"use client";

import Modal from "@/components/Modal/Modal";
import {
	updateProvider,
	deleteProviderMaterial,
	updateProviderMaterial,
} from "@/db/actions";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import areObjectsEqual from "@/utils/areObjectsEqual";

/**
 * Модальное окно, уведомляющее об успешном изменения данных поставщика
 * @param id Номер поставщика
 *
 */
export default function ConfirmSuccess({ params }: { params: { id: string } }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const providerMaterialsDisabledRows = searchParams.get(
		"providerMaterialsDisabledRows"
	)
		? JSON.parse(
				searchParams.get("providerMaterialsDisabledRows") as string
		  )
		: [];

	const providerMaterialsQuantities = searchParams.get(
		"providerMaterialsQuantities"
	)
		? JSON.parse(searchParams.get("providerMaterialsQuantities") as string)
		: {};

	const prevProviderMaterialsQuantities = JSON.parse(
		searchParams.get("prevProviderMaterialsInfo") as string
	).reduce((acc: any, material: any) => {
		acc[material["Номер материала"]] = material["Количество"];
		return acc;
	}, {});

	useEffect(() => {
		updateProvider({
			id: params.id,
			type: searchParams.get("providerType") as string,
			name: searchParams.get("providerName") as string,
			number: searchParams.get("providerNumber") as string,
			address: searchParams.get("providerAddress") as string,
		});

		if (
			JSON.stringify(providerMaterialsDisabledRows) != JSON.stringify([])
		) {
			for (const key in providerMaterialsDisabledRows) {
				const materialIdToDelete = providerMaterialsDisabledRows[key];
				deleteProviderMaterial(materialIdToDelete, params.id);
			}
		}

		if (
			!areObjectsEqual(
				prevProviderMaterialsQuantities,
				providerMaterialsQuantities
			)
		) {
			for (const material_id in providerMaterialsQuantities) {
				const quantityToUpdate =
					providerMaterialsQuantities[material_id];
				updateProviderMaterial(
					material_id,
					params.id,
					quantityToUpdate
				);
			}
		}
	}, []);

	return (
		<Modal
			title="Успех"
			onDismissFunc={() => {
				router.push(`/providers`);
			}}
		>
			<section className="modal-card-body">
				Данные о поставщике успешно обновлены
			</section>
			<footer className="modal-card-foot">
				<Link href={`/providers`} className="button is-success">
					К таблице поставщиков
				</Link>
			</footer>
		</Modal>
	);
}
