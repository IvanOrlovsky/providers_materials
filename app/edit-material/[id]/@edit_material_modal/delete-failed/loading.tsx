import Modal from "@/components/Modal/Modal"

/**
 * Модальное окно для загрузки окна уведомления о неудаче удаления материала 
 * в связи с наличием материала у одного из поставщиков
 */
export default function DeleteFailedLoading() {
    
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