
export default function EditProvider({ params } : {
    params: { id: string }
}) {
    return (
        <div>
            {params.id}
        </div>
    )
}