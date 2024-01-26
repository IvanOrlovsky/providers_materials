"use client"

import Modal from "@/components/Modal/Modal";
import { insertMaterial} from "@/app/db/actions";
import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function materialConfirmarion({ params }: { params: { id: string } }) {
    // const pathname = usePathname();
    // if (!pathname.includes('add-complete')) {
    //     return null;
    // }

    const router = useRouter();
    const searchParams = useSearchParams();

    const prevName = searchParams.get("prevName") as string;
    const prevUnitOfMeasure = searchParams.get("prevUnitOfMeasure") as string;
    const name = searchParams.get("name") as string;
    const unitOfMeasure = searchParams.get("unitOfMeasure") as string;
    // href={`/edit-material/${params.id}
    // /confirmation?
    // prevName=${materialInfo['Название материала']}
    // &prevUnitOfMeasure=${materialInfo['Единица измерения']}
    // &name=${materialName}
    // &unitOfMeasure=${materialUnitOfMeasure}`}

    // useEffect(() => {
    //     const name = searchParams.get("materialName") as string
    //     const unit_of_measure = searchParams.get("materialUnitOfMeasure") as string
    //     insertMaterial(name, unit_of_measure)

    // }, [])
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
                    <Link href={`/materials`}  className="button is-warning">
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
            <Link href={`/edit-material/${params.id}/confirm-complete?name=${name}&unitOfMeasure=${unitOfMeasure}`} className="button is-success" onClick={() => (alert("Необходимо будет обновить страницу видов материалов, чтобы изменения вступили в силу."))}>К списку материалов</Link>
            </footer>
        </Modal>
    )

}