"use client"

import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Модальное окно с формой добавления нового материала
 * 
 */
export default function AddMaterial(){

    const router = useRouter();

    const [materialName, setMaterialName] = useState("")
    const [materialUnitOfMeasure, setMaterialUnitOfMeasure] = useState("")

    /**
     * Функция, отслеживающее состояние введенного в input названия материала
     * @param name текущее введенное название материала
     */
    const handleMaterialNameChange = (name: string) => {
        setMaterialName(name)
    }

    /**
     * Функция, отслеживающее состояние введенного в input единицы измерения материала
     * @param unitOfMeasure текущее введенное единицы измерения материала
     */
    const handleMaterialUnitOfMeasureChange = (unitOfMeasure: string) => {
        setMaterialUnitOfMeasure(unitOfMeasure)
    }

    return (
        <Modal
        title="Добавить новый материал"
        >
            <section className="modal-card-body">
                <form onSubmit={(e) => {e.preventDefault(); }}>
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
                                    name="materialName"
                                    className="input"
                                    value={materialName}
                                    onChange={(e) => {handleMaterialNameChange(e.target.value)}}
                                    required
                                    >
                                        
                                    </input>
                                </td>
                                <td>
                                    <input
                                    name="materialUnitOfMeasure"
                                    className="input"
                                    value={materialUnitOfMeasure}
                                    onChange={(e) => {handleMaterialUnitOfMeasureChange(e.target.value)}}
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
                <button onClick={() => {router.push(`/materials/${1}/add-complete?materialName=${materialName}&materialUnitOfMeasure=${materialUnitOfMeasure}`)}} className="button is-success">
                    Добавить
                </button>
                <button className="button" onClick={() => (router.back())}>
                    Отмена
                </button>
            </footer>
        </Modal>
    )
}