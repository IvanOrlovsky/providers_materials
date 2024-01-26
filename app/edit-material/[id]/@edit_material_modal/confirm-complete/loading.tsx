import Modal from "@/components/Modal/Modal"

/**
 * Модальное окно загрузки окна об успешном изменения данных материала
 */
export default function Loading() {
    
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