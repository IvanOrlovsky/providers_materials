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
    currentUrl: string,
}

export default function ConfirmationModal({title, content, currentUrl, onOk, onClose}: ConfirmationModalProps){

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
        modalRef={confirmationModalRef}
        onDismiss={closeModal}
        >
            <section className="modal-card-body">
                {content}
            </section>
            <footer className="modal-card-foot">
                <button className="button is-success" onClick={clickOk}>
                    <Link href={currentUrl} className="has-text-white-bis">
                        Да
                    </Link>
                </button>
                <button className="button" onClick={closeModal}>
                    <Link href={currentUrl} className="has-text-black-bis">
                        Отмена
                    </Link>
                </button>
            </footer>
        </Modal>
    ) : null

    return confirmationModal
}