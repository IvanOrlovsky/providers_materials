"use client";

import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

type ModalProps = {
    title: string,
    children: React.ReactNode,
    onDismissFunc?: () => void,
};

export default function Modal({ title, children, onDismissFunc}: ModalProps) {


    const overlay = useRef(null);
    const wrapper = useRef(null);
    const router = useRouter();

    
    const onDismiss = useCallback(() => {
        if (onDismissFunc) {
            onDismissFunc();
        } else {
            onDismissFunc = () => router.back(); 
        }
    }, [router]);
    
    const onClick: MouseEventHandler = useCallback((e) => {
        if (e.target === overlay.current || e.target === wrapper.current) {
            if (onDismiss) onDismiss();
        }
    }, [onDismiss, overlay, wrapper]);

    const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
        if (e.key === "Escape") onDismiss();
    }, [onDismiss] );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <>
        <div className="modal is-active">
            <div className="modal-background" ref={overlay}  onClick={onClick}></div>
            <div className="modal-card" ref={wrapper}>
                <header className="modal-card-head">
                    <h1 className="modal-card-title">{title}</h1>
                    <button className="delete" aria-label="close" onClick={onDismiss}></button>
                </header>

                {children}
            </div>
        </div>
        </>
    )
}