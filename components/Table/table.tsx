import type { QueryResultRow } from "@vercel/postgres";

interface TableProps {
  entries: QueryResultRow[];
}

export default function Table({ entries }: TableProps) {

    const keys = Object.keys(entries[0]);
    
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {
                            keys.map((key) => (<th key={key}>{key}</th>))
                        }
                    </tr>
                </thead>
                <tbody>
                        {entries.map((entry, index) => (
                                <tr key={index}>
                                    {keys.map((key) => (
                                        <td key={key}>{entry[key]}</td>
                                    ))}
                                </tr>
                            ))}
                </tbody>
            </table>
        </div>
    );
}
