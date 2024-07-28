import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

const ViewRoom = () => {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/rooms/${id}`)
      .then((response) => {
        setRoom(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [])
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl py-4">Show Room</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{room._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Room No.</span>
            <span>{room.room}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Floor</span>
            <span>{room.floor}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created At</span>
            <span>{new Date(room.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Updated At</span>
            <span>{new Date(room.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewRoom