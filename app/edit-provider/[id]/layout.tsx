export default function EditProviderLayout({children, modal} : {
    children: React.ReactNode,
    modal: React.ReactNode,
}) {

    return (
        <>
            <div>{children}</div>
            <div>{modal}</div>
        </>
    )
}