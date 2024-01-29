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
import { useEditProviderContext } from "@/contexts/EditProviderContext";

/**
 * Модальное окно, уведомляющее об успешном изменения данных поставщика
 * @param id Номер поставщика
 *
 */
export default function ConfirmSuccess({ params }: { params: { id: string } }) {
	const context = useEditProviderContext();
	const router = useRouter();

	const { providerEditData, providerMaterialsEditData, setIsModalOpen } =
		context;

	const { providerName, providerNumber, providerType, providerAddress } =
		providerEditData;

	const {
		prevProviderMaterialsInfo,
		providerMaterialsDisabledRows,
		providerMaterialsQuantities,
	} = providerMaterialsEditData;

	const prevProviderMaterialsQuantities = prevProviderMaterialsInfo.reduce(
		(acc: any, material: any) => {
			acc[material["Номер материала"]] = material["Количество"];
			return acc;
		},
		{}
	);

	useEffect(() => {
		updateProvider({
			id: params.id,
			type: providerType,
			name: providerName,
			number: providerNumber,
			address: providerAddress,
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

	const ModalButtons = (
		<button
			onClick={() => {
				setIsModalOpen(false);
				router.push("/providers");
			}}
			className="button is-success"
		>
			К таблице поставщиков
		</button>
	);

	return (
		<Modal
			title="Успех"
			onDismissFunc={() => {
				router.push(`/providers`);
			}}
			context={context}
			buttons={ModalButtons}
		>
			<p>Данные о поставщике успешно обновлены</p>
		</Modal>
	);
}
