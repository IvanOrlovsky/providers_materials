import Modal from "@/components/Modal/Modal"

export default function deleteFailedLoading() {
    
    return (
        <Modal
        title="Загрузка"
        >
            <section className="modal-card-body">
                    <span className="loader"></span>
            </section>
            <footer className="modal-card-foot">

            </footer>
        </Modal>
    )
  }