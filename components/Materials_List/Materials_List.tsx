import { getAllMaterialsByProviderId } from "@/app/db/queries";
import { QueryResultRow } from "@vercel/postgres";


/**
 * Серверный компонент, дочерний для Providers_Table
 * @param entries Деструкторизованный номер поставщика
 * @returns Список материалов поставщика, по известному номеру поставщика
 */
export default async function Materials_List({ entries }: QueryResultRow) {

    let { rows } = await getAllMaterialsByProviderId(entries);

        return (
        <div className="">
            <ul>
                {rows.map((row, index) => (
                <li key={row["Номер материала"]}>
                    {'- '}
                    <strong>{row["Название материала"]}</strong>
                    <span>{'('}{row["Единица измерения"]}{') - '}</span>
                    <span>{row["Количество"]}</span>
                </li>
                ))}
            </ul>
        </div>
        );

}
