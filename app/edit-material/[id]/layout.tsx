
/**
 * Слой для станицы редактирования материала
 * @param children дочерний компонент
 * @param edit_material_modal модальные окна из параллельного маршрута
 * 
 */
export default function EditProviderLayout({children, edit_material_modal} : {
    children: React.ReactNode,
    edit_material_modal: React.ReactNode,
}) {

    return (
        <>
            <div>{children}</div>
            <div>{edit_material_modal}</div>
        </>
    )
}