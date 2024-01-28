"use client";

import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

type EditMaterialContext = {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditMaterialContext = createContext<EditMaterialContext | null>(
	null
);

export default function EditMaterialContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<EditMaterialContext.Provider
			value={{
				isModalOpen,
				setIsModalOpen,
			}}
		>
			{children}
		</EditMaterialContext.Provider>
	);
}

export function useEditMaterialContext() {
	const context = useContext(EditMaterialContext);

	if (!context) {
		throw new Error(
			"useEditMaterialContext must be within a EditMaterialContextProvider"
		);
	}

	return context;
}
