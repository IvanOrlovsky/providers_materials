"use client"

import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AddMaterial(){

    const router = useRouter();



    return (
        <Modal
        title="Добавить новый материал"
        >
            <section className="modal-card-body">
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <table className="table is-hoverable is-bordered">
                        <tbody>
                            <tr>
                                <th>
                                    Название материала
                                </th>
                                <th>
                                    Единица измерения
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <input

                                    required
                                    >
                                        
                                    </input>
                                </td>
                                <td>
                                    <input

                                    required
                                    >
                                        
                                    </input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </section>
            <footer className="modal-card-foot">
                
            </footer>
        </Modal>
    )
}