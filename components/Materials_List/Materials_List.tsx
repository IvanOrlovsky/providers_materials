import { getAllMaterialsById } from "@/app/db/queries";
import { QueryResultRow } from "@vercel/postgres";

export default async function Materials_List({ entries }: QueryResultRow) {

    let { rows } = await getAllMaterialsById(entries);

        return (
        <div className="content">
            <ul>
                {rows.map((row, index) => (
                <li key={index}>
                    <strong>{row.meterial_name}</strong>
                    <span>{'('}{row.unit_of_measure}{') - '}</span>
                    <span>{row.quantity}</span>
                </li>
                ))}
            </ul>
        </div>
        );

}
