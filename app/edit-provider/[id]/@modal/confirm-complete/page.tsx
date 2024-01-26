"use client"

import Modal from "@/components/Modal/Modal";
import { updateProvider, deleteMaterial } from "@/app/db/actions";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ConfirmSuccess({ params } : { params: { id: string } }) {

    const searchParams = useSearchParams();

    const providerMaterialsDisabledRows = searchParams.get("providerMaterialsDisabledRows") ? 
        JSON.parse(searchParams.get("providerMaterialsDisabledRows") as string) : []
    
    useEffect(() => {
        updateProvider({
            id: params.id,
            type: searchParams.get("providerType") as string,
            name: searchParams.get("providerName") as string,
            number: searchParams.get("providerNumber") as string,
            address: searchParams.get("providerAddress") as string,
        })

        if (JSON.stringify(providerMaterialsDisabledRows) != JSON.stringify([])) {
            for (const key in providerMaterialsDisabledRows) {
                const materialIdToDelete = providerMaterialsDisabledRows[key];
                deleteMaterial(materialIdToDelete, params.id)
              }
        }
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