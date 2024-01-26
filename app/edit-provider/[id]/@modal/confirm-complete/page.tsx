"use client"

import Modal from "@/components/Modal/Modal";
import { updateProvider } from "@/app/db/actions";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ConfirmSuccess({ params } : { params: { id: string } }) {

    const searchParams = useSearchParams();

    useEffect(() => {
        updateProvider({
            id: params.id,
            type: searchParams.get("providerType") as string,
            name: searchParams.get("providerName") as string,
            number: searchParams.get("providerNumber") as string,
            address: searchParams.get("providerAddress") as string,
        })
    }, [])
    
    return (
        <Modal
        title="Успех"
        >
            <section className="modal-card-body">
                Данные о поставщике успешно обновлены
            </section>
            <footer className="modal-card-foot">
            <Link href={`/providers`} className="button is-success">К таблице поставщиков</Link>
            </footer>
        </Modal>
    )

}