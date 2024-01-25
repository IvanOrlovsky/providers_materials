"use client"

import Modal from "@/components/Modal/Modal";
import { useSearchParams } from "next/navigation";
 

export default function Confirmation() {

    const searchParams = useSearchParams();
    console.log(searchParams.get("prevProviderInfo"))

    return (
        <Modal
        title='qwe'
        >
            <>
            </>
        </Modal>
    )
}

    
    