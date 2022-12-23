import React, {useState} from "react";
import Axios from "axios";
import { createContext, useEffect } from "react";
import { homeString } from "./constants";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUserEmail, setCurrentUserEmail] = useState(JSON.parse(localStorage.getItem("user"))|| null)
    const [currentUserId, setCurrentUserId] = useState(JSON.parse(localStorage.getItem("userid"))|| null)
    const [currentUserStatus, setCurrentUserStatus] = useState(JSON.parse(localStorage.getItem("owner"))|| null)


    const login = async (inputs)=>{
       const response = await Axios.post(homeString+"/login", inputs, {withCredentials: true, credentials: 'include'})
       setCurrentUserEmail(response.data[0])
       setCurrentUserId(response.data[1])
       setCurrentUserStatus(response.data[2])
    }

    const logout = async () =>{
        await Axios.post(homeString+"/logout",{withCredentials: true, credentials: 'include'})
        setCurrentUserEmail(null)
        setCurrentUserId(null)
        setCurrentUserStatus(null)
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUserEmail))
        localStorage.setItem("userid", JSON.stringify(currentUserId))
        localStorage.setItem("owner", JSON.stringify(currentUserStatus))
    }
    )

    return (
        <AuthContext.Provider value={{currentUserEmail, currentUserId, currentUserStatus, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}