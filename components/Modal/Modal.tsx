"use client";

import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useMaterialsContext } from "@/contexts/MaterialsContext";

type ModalProps = {
	title: string;
	children: React.ReactNode;
	onDismissFunc?: () => void;
	buttons?: React.ReactNode;
};

/**
 * Клиентский компонент переиспользуемого модального окна
 * @param title Заголовок в header окна
 * @param children Дочерний контент окна
 * @param onDismissFunc Опциональная функция, которая вызывается при нажатии на фон,
 * кнопку выхода, кнопку Escape. По умолчанию - router.back()
 * @param buttons Дочерние компоненты кнопок для footer`а модального окна
 */
export default function Modal({
	title,
	children,
	onDismissFunc,
	buttons,
}: ModalProps) {
	const overlay = useRef(null);
	const wrapper = useRef(null);
	const router = useRouter();

	const { isModalOpen, setIsModalOpen } = useMaterialsContext();

	const onDismiss = useCallback(() => {
		onDismissFunc = onDismissFunc ? onDismissFunc : () => router.back();
		onDismissFunc();
		setIsModalOpen(false);
	}, [router]);

	const onClick: MouseEventHandler = useCallback(
		(e) => {
			if (e.target === overlay.current || e.target === wrapper.current) {
				onDismiss();
			}
		},
		[onDismiss, overlay, wrapper]
	);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") onDismiss();
		},
		[onDismiss]
	);

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);
		setIsModalOpen(true);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [onKeyDown]);

	return (
		<>
			<div className={isModalOpen ? "modal is-active" : "modal"}>
				<div
					className="modal-background"
					ref={overlay}
					onClick={onClick}
				></div>
				<div className="modal-card" ref={wrapper}>
					<header className="modal-card-head">
						<h1 className="modal-card-title">{title}</h1>
						<button
							className="delete"
							aria-label="close"
							onClick={onDismiss}
						></button>
					</header>

					<section className="modal-card-body">{children}</section>
					<footer className="modal-card-foot">
						{/* <div onClick={onDismiss}>{buttons}</div> */}
						{buttons}
						<button className="button" onClick={onDismiss}>
							Отмена
						</button>
					</footer>
				</div>
			</div>
		</>
	);
}
