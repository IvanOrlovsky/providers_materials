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