"use client"

import Modal from "@/components/Modal/Modal";
import { FormEvent, useEffect } from "react";
import { getNotProviderMaterials } from "@/app/db/queries";

export default function AddMaterial({ params } : { params: { id: string } }){

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

    }

    useEffect(() => {
        const fetchData = async () => {
            return await getNotProviderMaterials(params.id);
        }
        const res = fetchData();
        console.log(res)
    }, [params.id])

    return (
        <Modal
        title="Добавить новый материал"
        >
            <section className="modal-card-body">
                <form onSubmit={handleSubmit}>
                    
                </form>
            </section>
            <footer className="modal-card-foot">

            </footer>
        </Modal>
    )
}