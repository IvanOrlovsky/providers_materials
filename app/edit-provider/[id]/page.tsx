
import Provider_Edit_Table from "@/components/Provider_Edit_Table/Provider_Edit_Table"
import Provider_Materials_Edit_Table from "@/components/Provider_Materials_Edit_Table/Provider_Materials_Edit_Table"
import Link from "next/link"


export default function EditProvider({ params } : { params: { id: string } }) {


    return (
        <div className="container my-5">

            <h1 className="title has-text-centered">
                Редактирование поставщика номер {params.id}
            </h1>
            
            <form>
                <div className="tile is-ancestor">
                    <div className="tile is-child box">
                        <p className="is-size-5">
                            <strong>
                                Информация о поставщике
                            </strong>                        
                        </p>
                        <Provider_Edit_Table id={params.id}/>
                    </div>
                    <div className="tile is-child box">
                        <p className="is-size-5">
                            <strong>
                                Материалы поставщика
                            </strong>                        
                        </p>
                        <Provider_Materials_Edit_Table id={params.id}/>
                    </div>
                </div>
                <Link 
                className="has-text-white-bis" 
                href={{
                    pathname: `/edit-provider/${params.id}/confirmation`,
                    query: {
                        name: "qwe"
                    }
                }}
                as={`/edit-provider/${params.id}/confirmation`}
                >
                    <button 
                    className="button is-warning is-fullwidth has-text-weight-bold my-3"
                    type="button"
                    >
                        Подтвердить изменения
                    </button>
                </Link>
                <button 
                className="button is-danger is-fullwidth has-text-weight-bold"
                type="button"
                >
                    Удалить поставщика
                </button>
            </form>  
        </div>
    )
}