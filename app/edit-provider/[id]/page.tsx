
import Provider_Edit_Table from "@/components/Provider_Edit_Table/Provider_Edit_Table"
import Provider_Materials_Edit_Table from "@/components/Provider_Materials_Edit_Table/Provider_Materials_Edit_Table"
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal"


export default function EditProvider({ params } : { params: { id: string } }) {



    async function onClose(){
        "use server"
        console.log('closed!')
    }
    async function onOk(){
        "use server"
        console.log("OK!!!")
    }

    return (
        <div className="container my-5">
            <ConfirmationModal
            title="test"
            onClose={onClose}
            onOk={onOk}
            content="test"
            currentUrl={`/edit-provider/${params.id}`}
            >

            </ConfirmationModal>
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
            </form>  
        </div>
    )
}