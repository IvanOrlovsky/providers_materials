"use client"

import Link from "next/link";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function deleteMaterialFailed() {

    const router = useRouter();

    return (
        <Modal
        title="Ошибка"
        onDismissFunc={() => {router.push(`/materials`)}}
        >
            <section className="modal-card-body has-background-danger has-text-white-bis">
                <p>
                    Не удалось удалить материал, так как он имеется в наличии у поставщиков. Удаление невозможно.
                </p>
            </section>
            <footer className="modal-card-foot">
                <Link href={`/materials`} className="button is-success">К видам материалов</Link>
            </footer>
        </Modal>
    )
}