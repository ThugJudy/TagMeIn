import React, { useContext,useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import { homeString } from "../Context/constants";


const VehicleShow = () => {

  const [searchKey, setSearchKey] = useState('')
  const [vehicles, setVehicles] = useState([]);
  const {currentUserEmail} = useContext(AuthContext)

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    const response = await Axios.get(homeString+'/vehicleShow', { params: { email: currentUserEmail } })
    setVehicles(response.data);
  };

  const deleteVehicle = async (id) => {
    try {
      await Axios.delete(homeString+`/vehicleShow/${id}`);
      getVehicles();
    } catch (error) {
      console.log(error);
    }
  };

  const SearchVehicle = async () => {
    const response = await Axios.get(homeString+'/vehicleSearch', { params: { email: currentUserEmail, searchKey: searchKey } })
    setVehicles(response.data);
  }


// Need to check why above request is not being called - if it sends the result query, we need to iterate it and fix it in UI 
    return (
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <Link to={'//localhost:3001/vehicle'} className="button is-success">
            Add New
          </Link>
          <form>
            <input type = "text" placeholder="Enter Car" name="searchKey" required onChange= {(e)=>{
              setSearchKey(e.target.value)
            }}/>
            <div className="action">
              <button type="button" onClick={()=>SearchVehicle()}>Search Car</button>
            </div>
          </form>
          <table className="table is-striped is-fullwidth" id="table">
            <thead>
              <tr>
                <th>No</th>
                <th>RegistrationNumber</th>
                <th>Car Name</th>
                <th>Car Type</th>
                <th>Color</th>
                <th>Average Rating</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={vehicle.VehicleID}>
                  <td>{index + 1}</td>
                  <td>{vehicle.RegistrationNumber}</td>
                  <td>{vehicle.CarName}</td>
                  <td>{vehicle.CarType}</td>
                  <td>{vehicle.Color}</td>
                  <td>{vehicle.AvgRating}</td>
                  <td>
                    <Link
                      // to={'//edit?${vehicle.VehicleID}'}
                      to="/vehicleUpdate"
                      state= {{
                          id: vehicle.VehicleID
                        }}
                      className="button is-small is-info mr-2"
                    >
                      Edit
                    </Link>
                    </td>
                    <td>
                    <button
                      onClick={() => deleteVehicle(vehicle.VehicleID)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default VehicleShow