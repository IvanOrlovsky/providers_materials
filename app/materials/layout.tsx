/**
 * Слой для станицы материалов
 * @param children дочерний компонент
 */
export default function MaterialsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div>{children}</div>
		</>
	);
}
