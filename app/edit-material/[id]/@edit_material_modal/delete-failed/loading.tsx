import Modal from "@/components/Modal/Modal";
import { useEditMaterialContext } from "@/contexts/EditMaterialContext";

/**
 * Модальное окно для загрузки окна уведомления о неудаче удаления материала
 * в связи с наличием материала у одного из поставщиков
 */
export default function DeleteFailedLoading() {
	const context = useEditMaterialContext();
	return (
		<Modal title="Загрузка" context={context}>
			<section className="modal-card-body">
				<span className="loader"></span>
			</section>
			<footer className="modal-card-foot"></footer>
		</Modal>
	);
}
