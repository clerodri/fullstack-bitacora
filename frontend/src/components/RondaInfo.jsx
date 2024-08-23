import { IoCloseCircleOutline } from "react-icons/io5";

function RondaInfo({ ronda, onClose }) {
  console.log("ronda ", ronda);
  return (
    <div className="fixed inset-0  flex flex-col max-h-screen bg-black bg-opacity-30 z-50 backdrop-blur-sm items-center justify-center">
      <div className="bg-white rounded-xl p-5 w-2/5 h-4/5 flex flex-col shadow-lg overflow-y-auto  xs:w-fit    ">
        <div className="flex justify-between items-center mb-5 ">
          <IoCloseCircleOutline
            className="place-self-auto cursor-pointer"
            size="2.5rem"
            color="black"
            onClick={onClose}
          />
          <h1 className="text-3xl font-bold">{ronda.name} </h1>
        </div>
        <div className="flex flex-col   items-center   ">
          {ronda.events.length === 0 ? (
            <div className="flex-1 flex text-3xl items-center justify-center">
              No se registran eventos en la RONDA
            </div>
          ) : null}
          {ronda.events?.map((event) => (
            <div
              key={event.id}
              className="space-x-2 bg-white-100 p-4 rounded-lg shadow-md justify-center flex-wrap max-w-[300] w-full "
            >
              <div className="flex flex-row space-x-10 w-full ">
                <div className="flex flex-col  ">
                  <div className=" flex flex-row  text-3xl  font-extrabold text-center items-center  ">
                    <h2 className="text-lg font-semibold">Titulo:</h2>
                    <div className="w-60 mx-2">
                      <h1
                        className=" break-words whitespace-normal "
                        style={{ color: "#0172B2" }}
                      >
                        {event.title}
                      </h1>
                    </div>
                  </div>
                  <div className=" flex-1  ">
                    <h2 className="flex-1   text-lg font-semibold">
                      Descripcion:
                    </h2>
                    <div className="flex-1 h-80 overflow-hidden overflow-y-auto break-words  rounded-lg border-2 p-2 border-gray-400 m-1 text-md font-light bg-blue-200 ">
                      <p className="w-96  whitespace-normal text-black font-semibold">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col items-center space-y-5">
                  {event.event_image && (
                    <img
                      style={{ height: 400, width: 400 }}
                      src={event.event_image}
                      alt="event image"
                      className="  object-cover rounded-lg "
                    />
                  )}
                  <div className="flex flex-row  gap-2 text-xl font-semibold mb-2 ">
                    <span>Hora :</span>
                    <h2>{formatDate(event.uploaded_at)} </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const formatDate = (dateString) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Date(dateString).toLocaleString("en-GB", options);
};
export default RondaInfo;
