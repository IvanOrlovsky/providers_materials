
export default function EditProvider({ params } : {
    params: { id: string }
}) {
    return (
        <div className="container my-5">
            <div className="tile is-ancestor">
                <div className="tile is-child box">
                    <p className="is-size-5">
                        <strong>
                            Информация о поставщике номер {params.id}
                        </strong>                        
                    </p>

                </div>
                <div className="tile is-child box">
                    <p className="is-size-5">
                        <strong>
                            Материалы поставщика номер {params.id}
                        </strong>                        
                    </p>
                </div>
            </div>
        </div>
    )
}