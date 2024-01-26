"use client"

import Provider_Edit_Table from "@/components/Provider_Edit_Table/Provider_Edit_Table"
import Provider_Materials_Edit_Table from "@/components/Provider_Materials_Edit_Table/Provider_Materials_Edit_Table"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import makeSearchParams from "@/app/utils/makeSearchParams"



export default function EditProvider({ params } : { params: { id: string } }) {

    const [providerEditData, setProviderEditData] = useState<{ [key: string]: string }>({});
    const [providerMaterialsEditData, setProviderMaterialsEditData] = useState<{ [key: string]: string }>({});
    
    const [providerDataLoadedState, setProviderDataLoadedState] = useState(false);
    const [providerMaterialDataLoadedState, setProviderMaterialDataLoadedState] = useState(false);

    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const urlParams = makeSearchParams(providerEditData, providerMaterialsEditData);

        router.push(`/edit-provider/${params.id}/confirmation/${urlParams}`)

    }

    return (
        <div className="container my-5">
            
            <h1 className="title has-text-centered">
                Редактирование поставщика номер {params.id}
            </h1>
            
            <form onSubmit={handleSubmit}>
                <div className="tile is-ancestor">
                    <div className="tile is-child box">
                        <p className="is-size-5">
                            <strong>
                                Информация о поставщике
                            </strong>                        
                        </p>
                        <Provider_Edit_Table 
                        id={params.id} 
                        setProviderEditData={setProviderEditData}
                        setProviderDataLoadedState={setProviderDataLoadedState}
                        />
                    </div>
                    <div className="tile is-child box">
                        <p className="is-size-5">
                            <strong>
                                Материалы поставщика
                            </strong>                        
                        </p>
                        <Provider_Materials_Edit_Table 
                        id={params.id} 
                        setProviderMaterialsEditData={setProviderMaterialsEditData}
                        setProviderMaterialDataLoadedState={setProviderMaterialDataLoadedState}
                        />
                    </div>
                </div>
                {providerMaterialDataLoadedState && providerDataLoadedState && (
                    <button 
                        className="button is-warning is-fullwidth has-text-weight-bold my-3"
                        type="submit"
                    >
                        Подтвердить изменения
                    </button>
                )}
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