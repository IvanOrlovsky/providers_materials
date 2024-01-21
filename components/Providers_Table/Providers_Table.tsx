import type { QueryResultRow } from "@vercel/postgres";
import Materials_List from "../Materials_List/Materials_List";


interface TableProps {
  entries: QueryResultRow[];
}

export default function Providers_Table({ entries }: TableProps) {

    const keys = Object.keys(entries[0]);

    return (
        <div className="container">
            <table className="table mx-5">
                <thead>
                    <tr>
                        {
                            keys.map((key) => (
                                <th key={key}>
                                    {key}
                                </th>
                            ))
                        }
                        <th>
                            Количетво материалов
                        </th>
                    </tr>
                </thead>
                <tbody>
                        {entries.map((entry) => (
                            <tr key={entry[keys[0]]}> 
                                {keys.map((key) => (
                                    <td key={entry[key]}>
                                        {entry[key]}
                                    </td>
                                ))}
                                <td>
                                    <Materials_List entries={entry[keys[0]]}/>
                                </td>
                                <td>
                                    <button 
                                    className="button is-primary"
                                    >
                                        <a href={`/edit-provider/${entry[keys[0]]}`}>
                                            Редактировать
                                        </a>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
