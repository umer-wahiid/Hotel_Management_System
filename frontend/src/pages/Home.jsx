import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import 'devextreme/dist/css/dx.light.css';
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  FilterRow,
  HeaderFilter
} from 'devextreme-react/data-grid';

const pageSizes = [10, 25, 50, 100];

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/rooms')
      .then((response) => {
        setRooms(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Rooms List</h1>
        <Link to="/rooms/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl"></MdOutlineAddBox>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <DataGrid
          dataSource={rooms}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
          width="100%"
        >
          <GroupPanel visible={true} />
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          <Grouping autoExpandAll={false} />

          <Column dataField="_id" caption="ID" />
          <Column
            dataField="floor"
            caption="Floor"
            groupIndex={0}
          />
          <Column
            dataField="room"
            caption="Room"
            filterValue={null} // Optional: initialize with a value if needed
          />
          <Column
            dataField="isActive"
            caption="Active"
          />
          <Column
            caption="Actions"
            cellRender={({ data }) => (
              <div className="actions-cell">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/rooms/details/${data._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/rooms/edit/${data._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/rooms/delete/${data._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </div>
            )}
          />
          <FilterRow visible={true} /> {/* Enable filtering for each column */}
          <HeaderFilter visible={true} /> {/* Enable header filters */}
          <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />
        </DataGrid>
      )
      }
    </div >
  )
}

export default Home