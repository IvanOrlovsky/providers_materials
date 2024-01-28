"use client";

import {
	useCallback,
	useRef,
	useEffect,
	MouseEventHandler,
	useState,
} from "react";
import { useRouter } from "next/navigation";

type ModalProps = {
	title: string;
	children: React.ReactNode;
	onDismissFunc?: () => void;
};

/**
 * Клиентский компонент переиспользуемого модального окна
 * @param title Заголовок в header окна
 * @param children Дочерний контент окна
 * @param onDismissFunc Опциональная функция, которая вызывается при нажатии на фон,
 * кнопку выхода, кнопку Escape. По умолчанию - router.back()
 */
export default function Modal({ title, children, onDismissFunc }: ModalProps) {
	const overlay = useRef(null);
	const wrapper = useRef(null);
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(true);

	const onDismiss = useCallback(() => {
		if (onDismissFunc) {
			onDismissFunc();
		} else {
			onDismissFunc = () => router.back();
			onDismissFunc();
		}
		setIsOpen(false);
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
		console.log("Modal");
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [onKeyDown]);

	return (
		<>
			{/* <div className={isOpen ? "modal is-active" : "modal"}> */}
			<div className="modal is-active">
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
					{children}
				</div>
			</div>
		</>
	);
}
