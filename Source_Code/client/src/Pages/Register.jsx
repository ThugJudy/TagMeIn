import React, { useState } from "react"
import Axios from "axios"
import {
  navigate,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { homeString } from "../Context/constants";


const Register = () => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const submitReview = () => {
    Axios.post(homeString+'/register',{
      email: email,
      name: name,
      phone: phone,
      address: address,
      city: city,
      state: state,
      country: country,
      password: password
    }).then(()=>{
      navigate("/");
    }).catch(error => alert(error.response.data))
  };

  return (
    <div className="App">
      <div className="login-form">
        <form>
        <h1>Registration</h1>
        <div className="content">
          <div className="input-field">
            <input type="email" placeholder="Email" name="email" onChange= {(e)=>{
              setEmail(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter Name" name="name" required onChange= {(e)=>{
              setName(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter Phone" name="phone" required onChange= {(e)=>{
              setPhone(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter Address" name="addr" required onChange= {(e)=>{
              setAddress(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter City" name="city" required onChange= {(e)=>{
              setCity(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter State" name="state" required onChange= {(e)=>{
              setState(e.target.value)
            }}/>
          </div>
          <div className="input-field">
            <input type = "text" placeholder="Enter Country" name="country" required onChange= {(e)=>{
              setCountry(e.target.value)
            }}/>
          </div>
          <div className="input-field">
          <input type="password" placeholder="Password" autoComplete="new-password" onChange= {(e)=>{
              setPassword(e.target.value)
            }}/>
          </div>
          <div className="action">
            <button type="button" onClick={submitReview}>Register</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Register