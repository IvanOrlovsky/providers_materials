"use client"

import { useState } from "react"

export default function NavBar() {

	const [isActive, setIsAcive] = useState(false);

	const toggleBurger = () => {
		setIsAcive(!isActive)
	}

	const burgerClass = isActive ? 'navbar-burger is-active' : 'navbar-burger';
	const menuClass = isActive ? 'navbar-menu is-active' : 'navbar-menu';

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="/">
					Главная страница
				</a>

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
					<a className="navbar-item" href="/providers">
						Поставщики
					</a>

					<a className="navbar-item" href="/materials">
						Виды материалов
					</a>
				</div>
			</div>
			
        </nav>
    )
}