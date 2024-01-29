import EditProviderContextProvider from "@/contexts/EditProviderContext";

/**
 * Слой для станицы редатирования поставщика
 * @param children дочерний компонент
 * @param modal модальные окна из параллельного маршрута
 *
 */
export default function EditProviderLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<EditProviderContextProvider>
			<div>{children}</div>
			<div>{modal}</div>
		</EditProviderContextProvider>
	);
}
