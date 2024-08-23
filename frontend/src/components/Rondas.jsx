import { useState } from "react";
import {
  formatHoraRonda,
  formatRondaDateCreated,
  getTimeDifference,
} from "../utils";
import RondaInfo from "./RondaInfo";

function Rondas({ rondas }) {
  const [showModal, setShowModal] = useState(false);
  const [ronda, setRonda] = useState();
  const handleModal = (data) => {
    setShowModal(true);
    setRonda(data);
  };

  return (
    <div className="container mx-auto  xs:w-fit">
      <h1 className="text-4xl font-bold m-4 text-center ">
        {" "}
        REGISTRO DE RONDAS{" "}
      </h1>
      <div className="overflow-x-auto">
        <table
          className="min-w-full  rounded-lg shadow-md text-3xl text-white "
          style={{ backgroundColor: "#0172B2" }}
        >
          <thead>
            <tr>
              <th className="py-2 px-4  ">Lugar</th>
              <th className="py-2 px-4 ">Empleado Asignado</th>
              <th className="py-2 px-4">Fecha Ronda</th>
              <th className="py-2 px-4">Inicio Ronda</th>
              <th className="py-2 px-4">Fin Ronda</th>
              <th className="py-2 px-4 ">Duración</th>
            </tr>
          </thead>
          <tbody>
            {rondas?.map((ronda) => (
              <tr
                key={ronda.id}
                className="border-t-2 text-center bg-gray-300 text-lg font-medium  text-black cursor-pointer "
                onClick={() => handleModal(ronda)}
              >
                {/* <td className="p-3">{ronda.ruta.name}</td> */}
                <td className="p-3 text-2xl">Laguna Dorada</td>
                <td className="">{ronda.employee.fullname}</td>
                <td className="">
                  {formatRondaDateCreated(ronda.date_created)}
                </td>
                <td className="">{formatHoraRonda(ronda.date_created)}</td>
                <td className="">
                  {ronda.date_finished
                    ? formatHoraRonda(ronda.date_finished)
                    : "-----"}
                </td>
                <td>
                  {ronda.date_finished
                    ? getTimeDifference(
                        formatHoraRonda(ronda.date_finished),
                        formatHoraRonda(ronda.date_created)
                      ) + " min"
                    : " ----- "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <RondaInfo ronda={ronda} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default Rondas;
