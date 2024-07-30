import { useState } from "react";
import axios from "axios";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const [room, setRoom] = useState('');
  const [floor, setFloor] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveRoom = () => {
    const data = {
      room,
      floor,
      isActive,
    };
    setLoading(true);
    axios.post('http://localhost:5555/rooms', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occured, please check console');
        console.log(error);
      })
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Room</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Room</label>
          <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Floor</label>
          <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Active</label>
          <input type="checkbox" value={isActive} onChange={(e) => setIsActive(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveRoom}>Save</button>
      </div>
    </div>
  )
}

export default CreateRoom