"use client"

import Modal from "@/components/Modal/Modal";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
 

export default function Confirmation({ params } : { params: { id: string } }) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const prevProviderMaterialsInfo = JSON.parse(searchParams.get("prevProviderMaterialsInfo") as string)
    const providerMaterialsDisabledRows = searchParams.get("providerMaterialsDisabledRows") ? 
        JSON.parse(searchParams.get("providerMaterialsDisabledRows") as string) : []
    const providerMaterialsQuantities = searchParams.get("providerMaterialsQuantities") ? 
        JSON.parse(searchParams.get("providerMaterialsQuantities") as string) : {}
    const prevProviderInfo = JSON.parse(searchParams.get("prevProviderInfo") as string)
    const providerType = searchParams.get("providerType")
    const providerName = searchParams.get("providerName")
    const providerNumber = searchParams.get("providerNumber")
    const providerAddress = searchParams.get("providerAddress")

    
    const prevProviderMaterialsQuantities = prevProviderMaterialsInfo.reduce((acc: any, material: any) => {
        acc[material['Номер материала']] = material['Количество'];
        return acc;
      }, {})


    if (
        (JSON.stringify(prevProviderMaterialsQuantities) === JSON.stringify(providerMaterialsQuantities)) &&
        (providerType === prevProviderInfo['Тип поставщика']) &&
        (providerName === prevProviderInfo['Название компании']) &&
        (providerNumber === prevProviderInfo['Номер телефона']) &&
        (providerAddress ===  prevProviderInfo['Адрес']) &&
        (JSON.stringify(providerMaterialsDisabledRows) === JSON.stringify([]))
    ) {
        return (
            <Modal
            title="Вы ничего не изменили">
                <section className="modal-card-body  has-background-warning">
                    <div className="container">
                        {`Вы не изменили информацию о поставщике ${params.id}`}
                    </div>
                </section>
                <footer  className="modal-card-foot">
                    <Link href={`/providers`}  className="button is-warning">
                        Я знаю и хочу продолжить
                    </Link>
                    <button className="button" onClick={() => {router.back()}}>Отмена</button>
                </footer>
            </Modal>
        )
    } 

    return (
        <Modal
        title='Подтвердите изменения'
        >
            <section className="modal-card-body">
                <div className="tile is-ancestor">
                    <div className="tile is-child box">
                    <table className="table is-bordered my-1 is-narrow">
                        <tbody>
                            <tr>
                                <th>
                                    Тип поставщика
                                </th>
                                <td className={prevProviderInfo["Тип поставщика"] != providerType?
                                "is-warning" : ""}>
                                    {providerType}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Название компании
                                </th>
                                <td className={prevProviderInfo['Название компании'] != providerName?
                                "is-warning" : ""}>
                                    {providerName}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Номер телефона
                                </th>
                                <td className={prevProviderInfo['Номер телефона'] != providerNumber?
                                "is-warning" : ""}>
                                    {providerNumber}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Адрес
                                </th>
                                <td className={prevProviderInfo['Адрес'] != providerAddress?
                                "is-warning" : ""}>
                                    {providerAddress}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div className="tile is-child box">
                        <table className="table is-bordered my-5"> 
                            <tbody>
                                {prevProviderMaterialsInfo.map((material: {[key: string] : string}) => (
                                    <tr
                                    key={material["Номер материала"]}
                                    style={providerMaterialsDisabledRows.includes(+material["Номер материала"]) ? { backgroundColor: 'rgba(255, 0, 0, 0.5)' } : {}}
                                    >
                                        <th className="">
                                            {material["Название материала"]}
                                        </th>
                                        <td>
                                            {providerMaterialsQuantities[parseInt(material["Номер материала"], 10)]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <footer className="modal-card-foot">
                <Link className="button is-success" href={`/edit-provider/${params.id}/confirm-complete`}>
                    Сохранить изменения
                </Link>
                <button className="button" onClick={() => {router.back()}}>Отмена</button>
            </footer>
        </Modal>
    )
}

    
    
    