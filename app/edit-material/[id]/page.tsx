"use client"

import { useEffect, useState } from "react";
import { getAllMaterialsById } from "../../db/queries";
import Link from "next/link";

export default function EditMaterial({ params }: { params: { id: string } }) {
  const [materialInfo, setMaterialsInfo] = useState<Record<string, string>>({});
  const [materialName, setMaterialName] = useState<string>("");
  const [materialUnitOfMeasure, setMaterialUnitOfMeasure] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const { rows } = await getAllMaterialsById(params.id);

      setMaterialsInfo(rows[0]);
      setMaterialName(rows[0]['Название материала']);
      setMaterialUnitOfMeasure(rows[0]['Единица измерения']);
    };

    fetchData();
  }, [params.id]);

  const handleMaterialNameChange = (name: string) => {
    setMaterialName(name);
  };

  const handleMaterialUnitsOfMeasureChange = (unit_of_measure: string) => {
    setMaterialUnitOfMeasure(unit_of_measure);
  };

  return (
    <div className="container my-5">
      <h1 className="title has-text-centered">{`Редактирование материала ${params.id}`}</h1>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <table className="table is-narrow is-bordered is-boxed">
              <thead>
                <tr>
                  <th>Номер материала</th>
                  <th>Название материала</th>
                  <th>Единица измерения</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{params.id}</td>
                  <td>
                    <input
                      type="text"
                      className="input"
                      placeholder={materialInfo['Название материала']}
                      value={materialName}
                      onChange={(e) => {
                        handleMaterialNameChange(e.target.value);
                      }}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input"
                      placeholder={materialInfo['Единица измерения']}
                      value={materialUnitOfMeasure}
                      onChange={(e) => {
                        handleMaterialUnitsOfMeasureChange(e.target.value);
                      }}
                      required
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>
                    {materialName !== "" && materialUnitOfMeasure !== "" ? (
                      <Link
                        href={`/edit-material/${params.id}/confirmation?prevName=${materialInfo['Название материала']}&prevUnitOfMeasure=${materialInfo['Единица измерения']}&name=${materialName}&unitOfMeasure=${materialUnitOfMeasure}`}
                        className="button is-warning is-fullwidth"
                      >
                        Сохранить изменения
                      </Link>
                    ) : (
                      <button className="button is-warning is-fullwidth is-loading"></button>
                    )}
                  </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <Link 
                            href={`/edit-material/${params.id}/delete-confirmation`}
                            className="button is-danger is-fullwidth has-text-weight-bold"
                            >
                                Удалить материал
                        </Link>
                    </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
