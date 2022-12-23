import React from "react"
import { useContext } from "react"
import { AuthContext } from "../Context/authContext"
import {MdDashboard} from "react-icons/md"
import {BiTrip, BiShow, BiLogOut} from "react-icons/bi"
import {AiOutlineSearch, AiFillCar, AiOutlineBars, AiOutlineLogout} from "react-icons/ai"
import {MdOutlinePendingActions} from "react-icons/md"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { homeString } from "../Context/constants"


const Home = ()=>{

    const [isopen, setisopen] = useState(false)
    const toggle = () =>{
        setisopen(!isopen)
    }
    const {currentUserEmail, currentUserId, currentUserStatus, logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const Logout = async()=>{
        await logout()
        navigate("/")
    }
    const [uprides, setUpRides] = useState([])

    useEffect(()=>{
        async function fetchData(){
            console.log("UI")
            console.log(homeString+"/getTrips", currentUserId, currentUserEmail)
            const response = await axios.get(homeString+"/getTrips",{params:{id:currentUserId}})
            console.log(response)
            if (response.data.length>0) {
                setUpRides(response.data)
            }
            else {
                setUpRides(response.data)
            }
        }
        fetchData()
    }, [currentUserId]
    )

    const linkItemsRider = [
        {
            path:"/home",
            name:"Dashboard",
            icon:<MdDashboard/>
        },
        {
            path:"/requestRides",
            name:"Search Rides",
            icon:<AiOutlineSearch/>
        },
        {
            path:"/vehicle",
            name:"RegisterVehicle",
            icon:<AiFillCar/>
        },
        {
            path:"/",
            name:"Logout",
            icon:<BiLogOut/>
        }
    ]

    const linkItemsOwner = [
        {
            path:"/home",
            name:"Dashboard",
            icon:<MdDashboard/>
        },
        {
            path:"/vehicleShow",
            name:"ShowVehicle",
            icon:<BiShow/>
        },
        {
            path:"/requestRides",
            name:"Search Rides",
            icon:<AiOutlineSearch/>
        },
        {
            path:"/vehicle",
            name:"AddVehicle",
            icon:<AiFillCar/>
        },
        {
            path:"/postTrips",
            name:"Post Trips",
            icon:<BiTrip/>
        },
        {
            path:"/pendingRequests",
            name:"Pending Requests",
            icon:<MdOutlinePendingActions/>
        },
        {
            path:"/",
            name:"Logout",
            icon:<BiLogOut/>
        }
    ]

    return(
        <div className="homepage">
            <div style={{width:isopen?"220px":"50px"}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display:isopen?"block":"none"}} className="logo">TagMeIn</h1>
                    <div style={{marginLeft: isopen ? "50px" : "0px"}} className="bars">
                        <AiOutlineBars onClick={toggle}/>
                    </div>
                </div>
                { currentUserStatus ? (
                        linkItemsOwner.map((item, index)=>(
                            <NavLink to={item.path} key={index} className="link" >
                                <div className="icon">{item.icon}</div>
                                <div style={{display: isopen ? "block" : "none"}} className="link_text">{item.name}</div>
                            </NavLink>

                        ))
                ):(
                    linkItemsRider.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isopen ? "block" : "none"}} className="link_text">{item.name}</div>
                        </NavLink>

                    ))
                )}
            </div>
            <div className="heading">
                <h1> Welcome {currentUserEmail}</h1>
                <div className="table">
                    { uprides!="No upcoming trips"? (
                        <table id="table">
                            <caption><h3>Upcoming Rides</h3></caption>
                            <thead>
                                <tr>
                                    <th>Source</th>
                                    <th>Destination</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {uprides.map((ride, index) => (
                                <tr>
                                    <td>{ride.Source}</td>
                                    <td>{ride.Destination}</td>
                                    <td>{ride.Time}</td>
                                </tr>
                            )
                            )}
                            </tbody>
                        </table>
                    ): (
                        <h3>{uprides}</h3>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home