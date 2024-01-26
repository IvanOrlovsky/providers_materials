"use client"

import Modal from "@/components/Modal/Modal";
import { deleteProvider } from "@/app/db/actions"
import { useRouter } from "next/navigation";

/**
 * Модальное окно подтверждения удаления поставщика
 * @param params Номер поставщика
 * 
 */
export default function DeleteProviderConfirmation({ params } : { params: { id: string } }) {

    const router = useRouter();

    const handleProviderDelete = (provider_id: string) => {
        deleteProvider(provider_id);
        router.push(`/providers`)
    }

    return (
        <Modal
        title={`Удаление поставщика ${params.id}`}
        >
            <section className="modal-card-body has-background-danger has-text-weight-bold has-text-white-bis">
                Вы уверены, что хотите удалить поставщика? Это действие необратимо.
            </section>
            <footer className="modal-card-foot">
                <button
                type="button"
                className="button is-danger"
                onClick={() => {handleProviderDelete(params.id)}}
                >
                    Удалить поставщика
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