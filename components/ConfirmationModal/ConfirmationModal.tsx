"use client";

import { useSearchParams } from "next/navigation";
import Modal from "../Modal/Modal";
import { useRef, useEffect } from "react";
import Link from "next/link";

interface ConfirmationModalProps{
    title: string,
    content: string,
    onOk: () => void,
    onClose: () => void,
}

export default function ConfirmationModal({title, content, onOk, onClose}: ConfirmationModalProps){

    const searchParams = useSearchParams();
    const confirmationModalRef = useRef<null | HTMLDialogElement>(null)
    const showConfirmationModal = searchParams.get('showModal')

    useEffect(() => {
        if (showConfirmationModal === 'y') {
            confirmationModalRef.current?.showModal()
        } else {
            confirmationModalRef.current?.close()
        }
    }, [showConfirmationModal])

    const closeModal = () => {
        confirmationModalRef.current?.close()
        onClose()
    }

    const clickOk = () => {
        onOk()
        closeModal()
    }

    const confirmationModal: JSX.Element | null = showConfirmationModal === 'y' 
    ? (
        <Modal
        title={title}
        >
            <section className="modal-card-body">
                {content}
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={clickOk}>
                        Да
                </button>
                <button className="button" onClick={closeModal}>
                        Отмена
                </button>
            </footer>
        </Modal>
    ) : null

    return confirmationModal
}