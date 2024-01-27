"use client"

import Modal from "@/components/Modal/Modal";
import { insertMaterial} from "@/app/db/actions";
import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Модальное подтверждения добавления материала
 * 
 */
export default function AddMaterialSuccess() {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        const name = searchParams.get("materialName") as string
        const unit_of_measure = searchParams.get("materialUnitOfMeasure") as string
        insertMaterial(name, unit_of_measure)

    }, [])

    
    if (!pathname.includes('add-complete')) {
        return null;
    }

    
    
    return (
        <Modal
        title="Успех"
        onDismissFunc={() => {router.push(`/materials`);}}
        >
            <section className="modal-card-body">
                Данные о видах материалов успешно обновлены
            </section>
            <footer className="modal-card-foot">
            <button  className="button is-success" onClick={() => {router.push(`/materials`);}}>
                К списку материалов
            </button>
            </footer>
        </Modal>
    )

}