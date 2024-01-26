"use client"

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { updateMaterial } from "@/app/db/actions";
import { useEffect } from "react";
import Modal from "@/components/Modal/Modal";

export default function UpdateMaterialSuccess({ params }: { params: { id: string } }) {

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        updateMaterial(params.id, searchParams.get("name") as string, searchParams.get("unitOfMeasure") as string);
    }, [])

    return (
        <Modal
        title="Успех"
        onDismissFunc={() => {router.push(`/materials`)}}
        >
            <section className="modal-card-body">
                Данные о материале успешно обновлены
            </section>
            <footer className="modal-card-foot">
                <Link href={`/materials`} className="button is-success">К видам материалов</Link>
            </footer>
        </Modal>
    )
}