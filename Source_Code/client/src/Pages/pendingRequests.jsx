import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext"
import { homeString } from "../Context/constants"; 

export const PendingRequests = () => {

    const {currentUserId} = useContext(AuthContext)
    const [requests, setRequests] = useState([])
    useEffect(()=>{
        async function fetchData(){
            console.log("reached UI")
            const response = await axios.get(homeString + "/getPendingRequests",{params:{id:currentUserId}})
            console.log(response.data)
            setRequests(response.data)
        }
        fetchData()
    }, [currentUserId]
    )

    const reload = () => window.location.reload()
    const confirm = async (e)=>{
        const id = e.target.id
    
        const response  = await axios.post(homeString+"/confirmRequest",{rideId:id}).catch(error => console.log("reached here"))    
        reload()
    }

    return (
        <div className="App">
            <h1>Pending Requests</h1>
            { requests!="No pending requests"?(
                <table>
                    <thead>
                        <tr>
                            <td>Source</td>
                            <td>Destination</td>
                            <td>Time</td>
                            <td>Seats</td>
                            <td>CarName</td>
                            <td>Name</td>
                            <td>Accept</td>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((ride,index)=>(
                            <tr>
                                <td>{ride.Source}</td>
                                <td>{ride.Desintaion}</td>
                                <td>{ride.Time}</td>
                                <td>{ride.Seats}</td>
                                <td>{ride.CarName}</td>
                                <td>{ride.Name}</td>
                                <td><button type="button" id = {ride.RequestID} onClick={confirm}>Accept</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ):(
                <h1>{requests}</h1>
            )
            }
        </div>
    )
}

