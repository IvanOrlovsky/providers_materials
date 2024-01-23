import { Ref } from "react"

interface ModalProps {
    title: string,
    onDismiss: () => void,
    modalRef: Ref<HTMLDialogElement>,
    children: React.ReactNode, 
}

export default function Modal({title, onDismiss, modalRef, children} : ModalProps) {

    return (
        <dialog ref={modalRef}>
            <div className="modal is-active" onClick={onDismiss}>
            <div className="modal-background"></div>
            <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                <header className="modal-card-head">
                    <h1 className="modal-card-title">{title}</h1>
                    <button className="delete" aria-label="close" onClick={onDismiss}></button>
                </header>

                {children}
            </div>
        </div>
        </dialog>
    )
}