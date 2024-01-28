"use client";

import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { useEditMaterialContext } from "@/contexts/EditMaterialContext";

/**
 * Модальное окно подтверждения изменения данных материала
 * Собирает все данные из параметров URL
 * @param params Номер материала
 * @returns Если данные не были изменены, то возвращает модальное окно
 * с предупреждением, иначе - окно, где показано где какие изменения совершил пользователь
 */
export default function MaterialConfirmarion({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();

	const context = useEditMaterialContext();

	const {
		setIsModalOpen,
		prevMaterialInfo,
		materialName,
		materialUnitOfMeasure,
	} = context;

	if (
		prevMaterialInfo["Название материала"] == materialName &&
		prevMaterialInfo["Единица измерения"] == materialUnitOfMeasure
	) {
		const ModalButtons = (
			<button
				onClick={() => {
					setIsModalOpen(false);
					router.push("/materials");
				}}
				className="button is-warning"
			>
				Я знаю и хочу продолжить
			</button>
		);
		return (
			<Modal
				title="Вы ничего не изменили"
				context={context}
				buttons={ModalButtons}
			>
				<div className="container">
					{`Вы не изменили информацию о материале ${params.id}`}
				</div>
			</Modal>
		);
	}

	const ModalButtons = (
		//href={`/edit-material/${params.id}/confirm-complete?name=${name}&unitOfMeasure=${unitOfMeasure}`}
		<button
			onClick={() => {
				setIsModalOpen(false);
				router.push(`/edit-material/${params.id}/confirm-complete`);
			}}
			className="button is-success"
		>
			Сохранить изменения
		</button>
	);

	return (
		<Modal
			title="Подтвердите изменения"
			context={context}
			buttons={ModalButtons}
		>
			<table className="table is-bordered">
				<thead>
					<tr>
						<th>Номер материала</th>
						<th>Название материала</th>
						<th>Единица измерения</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{params.id}</td>
						<td
							className={
								materialName ==
								prevMaterialInfo["Название материала"]
									? ""
									: "has-background-warning"
							}
						>
							{materialName}
						</td>
						<td
							className={
								prevMaterialInfo["Единица измерения"] ==
								materialUnitOfMeasure
									? ""
									: "has-background-warning"
							}
						>
							{materialUnitOfMeasure}
						</td>
					</tr>
				</tbody>
			</table>
		</Modal>
	);
}
