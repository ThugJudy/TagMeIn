import React, { useState, useEffect } from "react"
import Axios from "axios"
import { useLocation } from "react-router-dom"
import { homeString } from "../Context/constants"

const UpdateVehicle = () => {

  const [carName, setCarName] = useState('')
  const [carType, setCarType] = useState('')
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [color, setColor] = useState('')
  const [noOfSeats, setNoOfSeats] = useState('')
  const location = useLocation();
  const id = location.state.id

    useEffect(() => {
        loadDefault();
    }, []); 

  const updateVeh = () => {
    Axios.post(homeString+'/vehicleUpdate',{
        carName: carName,
        carType: carType,
        registrationNumber: registrationNumber,
        licenseNumber: licenseNumber,
        color: color,
        noOfSeats: noOfSeats,
        vehicleID: id,
    }).then(()=>{
      alert("Successfully updated")
    })
  };


  const loadDefault = async () => {
    const response = await Axios.get(homeString+'/vehicleById', { params: { id: id } })
    console.log(response.data[0].CarName)
    setCarName(response.data[0].CarName);
    setCarType(response.data[0].CarType);
    setRegistrationNumber(response.data[0].RegistrationNumber)
    setLicenseNumber(response.data[0].LicenseNumber)
    setColor(response.data[0].Color)
    setNoOfSeats(response.data[0].NoOfSeats)
    // setGender(response.data.gender);
  };

  return (
    <div className="App">
      <div className="login-form">
        <form>
        <h1>Update Vehicle</h1>
        <div className="content">
          <div className="input-field">
            <input type="text" placeholder="Car Name" name="carName" value= {carName} onChange= {(e)=>{
              setCarName(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter Car Type" name="carType" value={carType}  required onChange= {(e)=>{
              setCarType(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter Registration Number" name="registrationNumber" value={registrationNumber} required onChange= {(e)=>{
              setRegistrationNumber(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter License Number" name="licenseNumber" value={licenseNumber} required onChange= {(e)=>{
              setLicenseNumber(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter Color" name="color" value={color} required onChange= {(e)=>{
              setColor(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter No Of Seats" name="noOfSeats" value={noOfSeats} required onChange= {(e)=>{
              setNoOfSeats(e.target.value)
            }}/>
          </div>
          <div className="action">
            <button type="button" onClick={updateVeh}>Update Car</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateVehicle