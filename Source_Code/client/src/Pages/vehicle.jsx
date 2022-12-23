import React, { useContext, useState } from "react"
import Axios from "axios"
import { AuthContext } from "../Context/authContext";
import { homeString } from "../Context/constants";

const Vehicle = () => {

  const [carName, setCarName] = useState('')
  const [carType, setCarType] = useState('')
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [color, setColor] = useState('')
  const [noOfSeats, setNoOfSeats] = useState('')
  const {currentUserEmail} = useContext(AuthContext)

  const submitReview = () => {
    Axios.post(homeString+'/vehicle',{
        ownerEmail: currentUserEmail,
        carName: carName,
        carType: carType,
        registrationNumber: registrationNumber,
        licenseNumber: licenseNumber,
        color: color,
        noOfSeats: noOfSeats,
    }).then(()=>{
      alert("Successfully Inserted")
    })
  };

  return (
    <div className="App">
      <div className="login-form">
        <form>
        <h1>Add Vehicle</h1>
        <div className="content">
          <div className="input-field">
            <input type="text" placeholder="Car Name" name="carName" onChange= {(e)=>{
              setCarName(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter Car Type" name="carType" required onChange= {(e)=>{
              setCarType(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter Registration Number" name="registrationNumber" required onChange= {(e)=>{
              setRegistrationNumber(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter License Number" name="licenseNumber" required onChange= {(e)=>{
              setLicenseNumber(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter Color" name="color" required onChange= {(e)=>{
              setColor(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter No Of Seats" name="noOfSeats" required onChange= {(e)=>{
              setNoOfSeats(e.target.value)
            }}/>
          </div>
          <div className="action">
            <button type="button" onClick={submitReview}>Add Car</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Vehicle