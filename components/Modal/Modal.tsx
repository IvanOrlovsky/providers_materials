
interface ModalProps {
    isOpen: boolean,
    title: string,
    onDismiss: () => void,
    children: React.ReactNode 
}

export default function Modal({isOpen, title, onDismiss, children} : ModalProps) {

    if(!isOpen) {
        return null
    }


    return (
        <div className="modal" onClick={onDismiss}>
            <div className="modal-background"></div>
            <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                <header className="modal-card-head">
                    <h1 className="modal-card-title">{title}</h1>
                    <button className="delete" aria-label="close" onClick={onDismiss}></button>
                </header>

                {children}
            </div>
        </div>
    )
}