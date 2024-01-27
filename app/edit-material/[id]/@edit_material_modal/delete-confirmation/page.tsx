"use client"

import Modal from "@/components/Modal/Modal";
import { deleteMaterial } from "@/app/db/actions"
import { useRouter } from "next/navigation";

/**
 * Модальное окно для подтверждения удаления материала
 * @param id Номер материала
 */
export default function DeleteMaterialConfirmation({ params } : { params: { id: string } }) {

    const router = useRouter();

    const handleDelete = (material_id: string) => {
        deleteMaterial(material_id)
            .then(() => {
                router.push(`/materials/${1}`);
            })
            .catch(() => {
                router.push(`/edit-material/${params.id}/delete-failed`);
            });
    };

    return (
        <Modal
        title={`Удаление материала ${params.id}`}
        >
            <section className="modal-card-body has-background-danger has-text-weight-bold has-text-white-bis">
                Вы уверены, что хотите удалить материал? Это действие необратимо.
            </section>
            <footer className="modal-card-foot">
                <button
                type="button"
                className="button is-danger"
                onClick={() => {handleDelete(params.id)}}
                >
                    Удалить материал
                </button>
                <button
                type="button"
                className="button"
                onClick={() => {router.back()}}
                >
                    Отмена
                </button>
            </footer>
        </Modal>
    )

}