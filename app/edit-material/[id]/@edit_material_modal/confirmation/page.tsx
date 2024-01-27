"use client"

import Modal from "@/components/Modal/Modal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Модальное окно подтверждения изменения данных материала
 * Собирает все данные из параметров URL
 * @param params Номер материала
 * @returns Если данные не были изменены, то возвращает модальное окно
 * с предупреждением, иначе - окно, где показано где какие изменения совершил пользователь
 */
export default function MaterialConfirmarion({ params }: { params: { id: string } }) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const prevName = searchParams.get("prevName") as string;
    const prevUnitOfMeasure = searchParams.get("prevUnitOfMeasure") as string;
    const name = searchParams.get("name") as string;
    const unitOfMeasure = searchParams.get("unitOfMeasure") as string;

    if ((prevName == name) && (prevUnitOfMeasure == unitOfMeasure)) {
        return (
            <Modal
            title="Вы ничего не изменили">
                <section className="modal-card-body  has-background-warning">
                    <div className="container">
                        {`Вы не изменили информацию о материале ${params.id}`}
                    </div>
                </section>
                <footer  className="modal-card-foot">
                    <Link href={`/materials/${1}`}  className="button is-warning">
                        Я знаю и хочу продолжить
                    </Link>
                    <button className="button" onClick={() => {router.back()}}>Отмена</button>
                </footer>
            </Modal>
        )
    }
    
    return (
        <Modal
        title="Подтвердите изменения"
        >
            <section className="modal-card-body">
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
                            <td className={(name == prevName) ? "" : "has-background-warning"}>
                                {name}
                            </td>
                            <td className={(prevUnitOfMeasure == unitOfMeasure) ? "" : "has-background-warning"}>
                                {unitOfMeasure}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <footer className="modal-card-foot">
                <Link 
                href={`/edit-material/${params.id}/confirm-complete?name=${name}&unitOfMeasure=${unitOfMeasure}`} 
                className="button is-success"
                >
                    Сохранить изменения
                </Link>
                <button
                className="button"
                onClick={() => {router.back();}}
                >   
                    Отмена
                </button>
                </footer>
        </Modal>
    )

}