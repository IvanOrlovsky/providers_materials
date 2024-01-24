"use client";

export default function DeleteProviderMaterialBtn({ id }: {id: string}) {

    async function handleMaterialDelete(id: string) {
        console.log("ok")
    }
    
    return (
        <button
        className="button is-danger"
        onClick={() => handleMaterialDelete(id)}
        type="button"
        >
        Удалить
        </button>
    )
} 