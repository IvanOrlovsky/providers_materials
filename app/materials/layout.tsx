/**
 * Слой для станицы материалов
 * @param children дочерний компонент
 * @param materials_modal модальные окна из параллельного маршрута
 * 
 */
export default function MaterialsLayout({children, materials_modal} : {
    children: React.ReactNode,
    materials_modal: React.ReactNode,
}) {

    return (
        <>
            <div>{children}</div>
            <div>{materials_modal}</div>
        </>
    )
}