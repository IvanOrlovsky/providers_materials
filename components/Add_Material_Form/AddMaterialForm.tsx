"use client";

import { useState } from "react";
import { AddMaterial } from "./action";
import { useFormStatus } from "react-dom";

/**
 * Клиентский компонент формы добавления нового материала
 * , который появляется по нажатию на кнопку
 */
export default function AddMaterialForm() {
	const [isFormActive, setIsFormActive] = useState(false);
	const { pending } = useFormStatus();

	const ButtonToShowForm = (
		<button
			className="button is-warning"
			onClick={() => {
				setIsFormActive(!isFormActive);
			}}
		>
			Добавить материал
		</button>
	);

	const Form = (
		<form id="AddMaterialForm" action={AddMaterial}>
			<input
				name="materialName"
				className="input"
				placeholder="Название материала"
				required
			></input>

			<input
				name="materialUnitOfMeasure"
				className="input"
				placeholder="Единица измерения"
				required
			></input>

			<button type="submit" className="button is-success">
				Добавить
			</button>
			<button
				type="button"
				className="button"
				onClick={() => {
					setIsFormActive(!isFormActive);
				}}
				aria-disabled={pending}
			>
				Отмена
			</button>
		</form>
	);

	return isFormActive ? Form : ButtonToShowForm;
}
