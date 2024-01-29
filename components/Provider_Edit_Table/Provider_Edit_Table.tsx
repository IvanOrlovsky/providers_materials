"use client";

import { useEditProviderContext } from "@/contexts/EditProviderContext";
import { getProviderById } from "@/db/queries";
import { useEffect, ChangeEvent } from "react";

/**
 * Клиентский компонент таблицы редактирования данных поставщика
 * @param id номер поставщика
 */
export default function Provider_Edit_Table({ id }: { id: string }) {
	const context = useEditProviderContext();
	const {
		prevProviderData,
		setPrevProviderData,
		providerEditData,
		setProviderEditData,
		setProviderDataLoadedState,
	} = context;

	useEffect(() => {
		const fetchData = async () => {
			const { rows } = await getProviderById(id);
			setPrevProviderData({
				providerType: rows[0]["Тип поставщика"],
				providerName: rows[0]["Название компании"],
				providerNumber: rows[0]["Номер телефона"],
				providerAddress: rows[0]["Адрес"],
			});
			setProviderEditData({
				providerType: rows[0]["Тип поставщика"],
				providerName: rows[0]["Название компании"],
				providerNumber: rows[0]["Номер телефона"],
				providerAddress: rows[0]["Адрес"],
			});
		};
		fetchData();
		setProviderDataLoadedState(true);
	}, [id]);

	/**
	 * Функция, которая обрабатывает все введенные значения на форме
	 * @param e событие изменения ввода
	 */
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		switch (name) {
			case "providerType":
				setProviderEditData((prevData: any) => ({
					...prevData,
					providerType: value,
				}));
				break;
			case "providerName":
				setProviderEditData((prevData: any) => ({
					...prevData,
					providerName: value,
				}));
				break;
			case "providerNumber":
				setProviderEditData((prevData: any) => ({
					...prevData,
					providerNumber: value,
				}));
				break;
			case "providerAddress":
				setProviderEditData((prevData: any) => ({
					...prevData,
					providerAddress: value,
				}));
				break;
			default:
				break;
		}
	};

	return (
		<>
			<table className="table is-bordered my-5">
				<tbody>
					<tr>
						<th>Тип поставщика</th>
						<td>
							<div className="select">
								<select
									name="providerType"
									defaultValue={prevProviderData.providerType}
									onChange={handleChange}
									required
								>
									<option
										value={prevProviderData.providerType}
										disabled
										hidden
									>
										{prevProviderData.providerType}
									</option>
									<option value="ИП">ИП</option>
									<option value="Самозанятый">
										Самозанятый
									</option>
									<option value="ООО">ООО</option>
									<option value="АО">АО</option>
								</select>
							</div>
						</td>
					</tr>
					<tr>
						<th>Название компании</th>
						<td>
							<input
								name="providerName"
								type="text"
								placeholder={prevProviderData.providerName}
								className="input"
								value={providerEditData.providerName}
								onChange={handleChange}
								required
							/>
						</td>
					</tr>
					<tr>
						<th>Номер телефона</th>
						<td>
							<input
								name="providerNumber"
								type="tel"
								placeholder={prevProviderData.providerNumber}
								className="input"
								value={providerEditData.providerNumber}
								onChange={handleChange}
								required
							/>
						</td>
					</tr>
					<tr>
						<th>Адрес</th>
						<td>
							<input
								name="providerAddress"
								type="text"
								placeholder={prevProviderData.providerAddress}
								className="input"
								value={providerEditData.providerAddress}
								onChange={handleChange}
								required
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}
