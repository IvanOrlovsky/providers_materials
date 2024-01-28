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
	materialName: string;
	setMaterialName: Dispatch<SetStateAction<string>>;
	materialUnitOfMeasure: string;
	setMaterialUnitOfMeasure: Dispatch<SetStateAction<string>>;
};

export const MaterialsContext = createContext<MaterialsContext | null>(null);

export default function MaterialsContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [materialName, setMaterialName] = useState("");
	const [materialUnitOfMeasure, setMaterialUnitOfMeasure] = useState("");

	return (
		<MaterialsContext.Provider
			value={{
				isModalOpen,
				setIsModalOpen,
				materialName,
				setMaterialName,
				materialUnitOfMeasure,
				setMaterialUnitOfMeasure,
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
