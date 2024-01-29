"use client";

import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import { QueryResultRow } from "@vercel/postgres";

type EditProviderContext = {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	providerEditData: {
		providerType: string;
		providerName: string;
		providerNumber: string;
		providerAddress: string;
	};
	setProviderEditData: Dispatch<
		SetStateAction<{
			providerType: string;
			providerName: string;
			providerNumber: string;
			providerAddress: string;
		}>
	>;
	prevProviderData: {
		providerType: string;
		providerName: string;
		providerNumber: string;
		providerAddress: string;
	};
	setPrevProviderData: Dispatch<
		SetStateAction<{
			providerType: string;
			providerName: string;
			providerNumber: string;
			providerAddress: string;
		}>
	>;
	providerMaterialsEditData: {
		prevProviderMaterialsInfo: QueryResultRow;
		providerMaterialsDisabledRows: string[];
		providerMaterialsQuantities: { [key: string]: string };
	};
	setProviderMaterialsEditData: Dispatch<
		SetStateAction<{
			prevProviderMaterialsInfo: QueryResultRow[];
			providerMaterialsDisabledRows: string[];
			providerMaterialsQuantities: { [key: string]: string };
		}>
	>;
	providerDataLoadedState: boolean;
	setProviderDataLoadedState: Dispatch<SetStateAction<boolean>>;
	providerMaterialDataLoadedState: boolean;
	setProviderMaterialDataLoadedState: Dispatch<SetStateAction<boolean>>;
	materialRows: QueryResultRow[];
	setMaterialRows: Dispatch<SetStateAction<QueryResultRow[]>>;
	disabledRows: string[];
	setDisabledRows: Dispatch<SetStateAction<string[]>>;
	materialQuantities: {
		[key: string]: string;
	};
	setMaterialQuantities: Dispatch<
		SetStateAction<{
			[key: string]: string;
		}>
	>;
};

export const EditProviderContext = createContext<EditProviderContext | null>(
	null
);

export default function EditProviderContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [prevProviderData, setPrevProviderData] = useState<{
		providerType: string;
		providerName: string;
		providerNumber: string;
		providerAddress: string;
	}>({
		providerType: "",
		providerName: "",
		providerNumber: "",
		providerAddress: "",
	});
	const [providerEditData, setProviderEditData] = useState<{
		providerType: string;
		providerName: string;
		providerNumber: string;
		providerAddress: string;
	}>({
		providerType: "",
		providerName: "",
		providerNumber: "",
		providerAddress: "",
	});
	const [providerMaterialsEditData, setProviderMaterialsEditData] = useState<{
		prevProviderMaterialsInfo: QueryResultRow[];
		providerMaterialsDisabledRows: string[];
		providerMaterialsQuantities: { [key: string]: string };
	}>({
		prevProviderMaterialsInfo: [],
		providerMaterialsDisabledRows: [],
		providerMaterialsQuantities: {},
	});
	const [providerDataLoadedState, setProviderDataLoadedState] =
		useState(false);
	const [
		providerMaterialDataLoadedState,
		setProviderMaterialDataLoadedState,
	] = useState(false);
	const [materialRows, setMaterialRows] = useState<QueryResultRow[]>([]);
	const [disabledRows, setDisabledRows] = useState<string[]>([]);
	const [materialQuantities, setMaterialQuantities] = useState<{
		[key: string]: string;
	}>({});

	return (
		<EditProviderContext.Provider
			value={{
				isModalOpen,
				setIsModalOpen,
				providerEditData,
				setProviderEditData,
				prevProviderData,
				setPrevProviderData,
				providerMaterialsEditData,
				setProviderMaterialsEditData,
				providerDataLoadedState,
				setProviderDataLoadedState,
				providerMaterialDataLoadedState,
				setProviderMaterialDataLoadedState,
				materialRows,
				setMaterialRows,
				disabledRows,
				setDisabledRows,
				materialQuantities,
				setMaterialQuantities,
			}}
		>
			{children}
		</EditProviderContext.Provider>
	);
}

export function useEditProviderContext() {
	const context = useContext(EditProviderContext);

	if (!context) {
		throw new Error(
			"useEditProviderContext must be within a EditProviderContextProvider"
		);
	}

	return context;
}
