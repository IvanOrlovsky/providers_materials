"use client"

import Modal from "@/components/Modal/Modal";
import { insertMaterial} from "@/app/db/actions";
import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AddSuccess() {
    

    const router = useRouter();
    const searchParams = useSearchParams();

    const pathname = usePathname();
    if (!pathname.includes('add-complete')) {
        return null;
    }

    useEffect(() => {
        const name = searchParams.get("materialName") as string
        const unit_of_measure = searchParams.get("materialUnitOfMeasure") as string
        insertMaterial(name, unit_of_measure)

    }, [])
    
    return (
        <Modal
        title="Успех"
        onDismissFunc={() => {router.push(`/materials`);}}
        >
            <section className="modal-card-body">
                Данные о видах материалов успешно обновлены
            </section>
            <footer className="modal-card-foot">
            <Link href={`/materials`} className="button is-success" onClick={() => (alert("Необходимо будет обновить страницу видов материалов, чтобы изменения вступили в силу."))}>К списку материалов</Link>
            </footer>
        </Modal>
    )

}