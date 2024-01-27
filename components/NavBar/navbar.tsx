"use client"

import { useState } from "react"
import Link from "next/link";

/**
 * Клиентский компонент навигационной панели
 * Находится на корневом слое сайта, всегда сверху
 */
export default function NavBar() {

	const [isActive, setIsAcive] = useState(false);

	const toggleBurger = () => {
		setIsAcive(!isActive)
	}

	const burgerClass = isActive ? 'navbar-burger is-active' : 'navbar-burger';
	const menuClass = isActive ? 'navbar-menu is-active' : 'navbar-menu';

    return (
        <div className="is-widescreen">
			<nav className="navbar has-background-grey-light px-5" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<Link className="navbar-item has-text-black-bis is-size-4" href="/">
					Главная страница
				</Link>

				<a
				role="button"
				className={burgerClass}
				aria-label="menu"
				aria-expanded="false"
				data-target="navMenu"
				onClick={toggleBurger}
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			
			<div id="navMenu" className={menuClass}>
				<div className="navbar-end">
					<Link className="navbar-item has-text-black-bis" href="/providers">
						Поставщики
					</Link>

					<Link className="navbar-item has-text-black-bis" href={`/materials/${1}`}>
						Виды материалов
					</Link>
				</div>
			</div>
        </nav>
		</div>
    )
}