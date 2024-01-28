"use client";

import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

type MaterialsContext = {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const MaterialsContext = createContext<MaterialsContext | null>(null);

export default function MaterialsContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<MaterialsContext.Provider
			value={{
				isModalOpen,
				setIsModalOpen,
			}}
		>
			{children}
		</MaterialsContext.Provider>
	);
}

export function useMaterialsContext() {
	const context = useContext(MaterialsContext);

	if (!context) {
		throw new Error(
			"useMaterialsContext must be within a MaterialsContextProvider"
		);
	}

	return context;
}
