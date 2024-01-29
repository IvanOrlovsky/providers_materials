"use client";

import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import areObjectsEqual from "@/utils/areObjectsEqual";
import { useEditProviderContext } from "@/contexts/EditProviderContext";

/**
 * Модальное окно подтверждения изменения данных поставщика
 * Собирает все данные из параметров URL
 * @param params Номер поставщика
 * @returns Если данные не были изменены, то возвращает модальное окно
 * с предупреждением, иначе - окно, где показано где какие изменения совершил пользователь
 */
export default function ProviderConfirmarion({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();

	const context = useEditProviderContext();

	const {
		prevProviderData,
		providerMaterialsEditData,
		providerEditData,
		setIsModalOpen,
	} = context;

	const { providerName, providerAddress, providerNumber, providerType } =
		providerEditData;
	const {
		prevProviderMaterialsInfo,
		providerMaterialsDisabledRows,
		providerMaterialsQuantities,
	} = providerMaterialsEditData;

	const prevProviderMaterialsQuantities: {
		[key: string]: string;
	} = prevProviderMaterialsInfo.reduce((acc: any, material: any) => {
		acc[material["Номер материала"]] = material["Количество"];
		return acc;
	}, {});

	if (
		areObjectsEqual(
			prevProviderMaterialsQuantities,
			providerMaterialsQuantities
		) &&
		providerType == prevProviderData.providerType &&
		providerName == prevProviderData.providerName &&
		providerNumber == prevProviderData.providerNumber &&
		providerAddress == prevProviderData.providerAddress &&
		JSON.stringify(providerMaterialsDisabledRows) == JSON.stringify([])
	) {
		const ModalButtons = (
			<button
				onClick={() => {
					setIsModalOpen(false);
					router.push("/providers");
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
					{`Вы не изменили информацию о поставщике ${params.id}`}
				</div>
			</Modal>
		);
	}

	const ModalButtons = (
		<button
			className="button is-success"
			onClick={() => {
				setIsModalOpen(false);
				router.push(`/edit-provider/${params.id}/confirm-complete`);
			}}
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
			<div className="tile is-ancestor">
				<div className="tile is-parent is-vertical">
					<div className="tile is-child">
						<table className="table is-bordered">
							<tbody>
								<tr>
									<td></td>
									<td>- Ничего не изменилось</td>
								</tr>
								<tr>
									<td className="has-background-warning"></td>
									<td>- Значение изменено</td>
								</tr>
								<tr>
									<td className="has-background-danger"></td>
									<td>- Значение будет удалено</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="tile is-parent">
						<div className="tile is-child box">
							<table className="table is-bordered my-1 is-narrow">
								<tbody>
									<tr>
										<th>Тип поставщика</th>
										<td
											className={
												prevProviderData.providerType !=
												providerType
													? "is-warning"
													: ""
											}
										>
											{providerType}
										</td>
									</tr>
									<tr>
										<th>Название компании</th>
										<td
											className={
												prevProviderData.providerName !=
												providerName
													? "is-warning"
													: ""
											}
										>
											{providerName}
										</td>
									</tr>
									<tr>
										<th>Номер телефона</th>
										<td
											className={
												prevProviderData.providerNumber !=
												providerNumber
													? "is-warning"
													: ""
											}
										>
											{providerNumber}
										</td>
									</tr>
									<tr>
										<th>Адрес</th>
										<td
											className={
												prevProviderData.providerAddress !=
												providerAddress
													? "is-warning"
													: ""
											}
										>
											{providerAddress}
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="tile is-child box">
							<table className="table is-bordered my-5">
								<tbody>
									{prevProviderMaterialsInfo.map(
										(material: {
											[key: string]: string;
										}) => (
											<tr
												key={
													material["Номер материала"]
												}
												style={
													providerMaterialsDisabledRows.includes(
														material[
															"Номер материала"
														]
													)
														? {
																backgroundColor:
																	"rgba(255, 0, 0, 0.5)",
														  }
														: material[
																"Количество"
														  ] !=
														  providerMaterialsQuantities[
																parseInt(
																	material[
																		"Номер материала"
																	],
																	10
																)
														  ]
														? {
																backgroundColor:
																	"rgba(255, 221, 87, 0.7)",
														  }
														: {}
												}
											>
												<th>
													{
														material[
															"Название материала"
														]
													}
												</th>
												<td>
													{providerMaterialsQuantities[
														parseInt(
															material[
																"Номер материала"
															],
															10
														)
													] || material["Количество"]}
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}
