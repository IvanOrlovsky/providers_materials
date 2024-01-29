"use client";

import Provider_Edit_Table from "@/components/Provider_Edit_Table/Provider_Edit_Table";
import Provider_Materials_Edit_Table from "@/components/Provider_Materials_Edit_Table/Provider_Materials_Edit_Table";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import makeSearchParams from "@/utils/makeSearchParams";
import Link from "next/link";
import { useEditProviderContext } from "@/contexts/EditProviderContext";

/**
 * Клиентская страница редактирования информации о конкретном поставщике
 * @param params.id Номер поставщика
 *
 */
export default function EditProvider({ params }: { params: { id: string } }) {
	const router = useRouter();

	const context = useEditProviderContext();
	const { providerMaterialDataLoadedState, providerDataLoadedState } =
		context;
	/**
	 * Функция, обрабатывающая подтверждение формы
	 * Создает из текущих данных формы параметры для URL адреса
	 * и показывет модальное окно подтверждения сохранения изменений
	 * @param e Событие подтверждения формы
	 */
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		router.push(`/edit-provider/${params.id}/confirmation`);
	};

	return (
		<div className="container my-5">
			<h1 className="title has-text-centered">
				Редактирование поставщика номер {params.id}
			</h1>

			<form onSubmit={handleSubmit}>
				<div className="tile is-ancestor">
					<div className="tile is-child box">
						<p className="is-size-5">
							<strong>Информация о поставщике</strong>
						</p>
						<Provider_Edit_Table id={params.id} />
					</div>
					<div className="tile is-child box">
						<p className="is-size-5">
							<strong>Материалы поставщика</strong>
						</p>
						<p className="is-size-6 my-2">
							Выберите претендующие на удаление материалы или
							измените количество существующих:
						</p>
						<Provider_Materials_Edit_Table id={params.id} />
					</div>
				</div>
				{providerMaterialDataLoadedState && providerDataLoadedState ? (
					<button
						className="button is-warning is-fullwidth has-text-weight-bold my-3"
						type="submit"
					>
						Подтвердить изменения
					</button>
				) : (
					<button className="button is-warning is-fullwidth is-loading"></button>
				)}
				<Link
					href={`/edit-provider/${params.id}/delete-confirmation`}
					className="button is-danger is-fullwidth has-text-weight-bold"
				>
					Удалить поставщика
				</Link>
			</form>
		</div>
	);
}
