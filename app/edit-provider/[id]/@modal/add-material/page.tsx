"use client"

import Modal from "@/components/Modal/Modal";
import { FormEvent } from "react";

export default function AddMaterial({ params } : { params: { id: string } }){

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

    }

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