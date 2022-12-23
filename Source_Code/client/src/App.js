import './App.css';
import './css/homePage.css'
import React, { Component }  from 'react';
import Register from "./Pages/Register"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Vehicle from './Pages/vehicle';
import Login from './Pages/Login';
import VehicleShow from './Pages/vehicleShow';
import Home from './Pages/home'
import UpdateVehicle from './Pages/vehicleUpdate';
import { RequestRide } from './Pages/RequestRide';
import { AvailableRides } from './Pages/AvailableRides';
import { PostTrip } from './Pages/PostTrips';
import { PendingRequests } from './Pages/pendingRequests'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/vehicle",
      element: <Vehicle/>
    },
    {
      path: "/vehicleshow",
      element: <VehicleShow/>
    },
    {
      path: "/vehicleUpdate",
      element: <UpdateVehicle/>
    },
    {
      path: "/requestRides",
      element: <RequestRide/>
    },
    {
      path: "/availableRides",
      element: <AvailableRides/>
    },
    {
      path:"/postTrips",
      element:<PostTrip/>
    },
    {
      path:"/pendingRequests",
      element:<PendingRequests/>
    }
  ]);

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
