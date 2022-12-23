import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../Context/authContext";


const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) =>{
    setInputs((prev) => ({...prev, [e.target.name]:[e.target.value]}))
  }

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const {login} = useContext(AuthContext)
  const submitLogin = async () =>{

    try{
      await login(inputs)
      navigate("/home")
    } catch (error){
      alert(error.response.data)
    }
  }

  return (
    <div className="login">
      <div className="login-form">
        <form>
        <h1>Login</h1>
        <div className="content">
          <div className="input-field">
            <input type="email" placeholder="Email" name="email" onChange= {handleChange}/>
          </div>
          <div className="input-field">
          <input type="password" placeholder="Password" name="password" onChange= {handleChange}/>
          </div>
          <div className="action">
            <button type="button" onClick={submitLogin}>Login</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Login