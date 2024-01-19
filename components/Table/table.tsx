import type { QueryResultRow } from "@vercel/postgres";

interface TableProps {
  entries: QueryResultRow[];
}

export default function Table({ entries }: TableProps) {
    const a = entries;
    return (
        <div>
            {JSON.stringify(a)}
        </div>
    );
}
