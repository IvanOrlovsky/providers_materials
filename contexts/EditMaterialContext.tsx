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
	materialUnitOfMeasure: string;
	setMaterialUnitOfMeasure: Dispatch<SetStateAction<string>>;
	materialName: string;
	setMaterialName: Dispatch<SetStateAction<string>>;
	prevMaterialInfo: Record<string, string>;
	setPrevMaterialsInfo: Dispatch<SetStateAction<Record<string, string>>>;
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
	const [prevMaterialInfo, setPrevMaterialsInfo] = useState<
		Record<string, string>
	>({});
	const [materialName, setMaterialName] = useState<string>("");
	const [materialUnitOfMeasure, setMaterialUnitOfMeasure] =
		useState<string>("");

	return (
		<EditMaterialContext.Provider
			value={{
				isModalOpen,
				setIsModalOpen,
				prevMaterialInfo,
				setPrevMaterialsInfo,
				materialName,
				setMaterialName,
				materialUnitOfMeasure,
				setMaterialUnitOfMeasure,
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
