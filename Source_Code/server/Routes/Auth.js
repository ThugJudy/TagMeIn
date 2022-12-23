import express from "express";
// import Vehicle from "../../client/src/Pages/vehicle";
import { login, register, logout, vehicleShow, vehicle, vehicleUpdate, VehicleDelete, vehicleSearch, vehicleByID, requestRides, trips, postTrip, getVehicle, tripBooking, PendingRequest, ConfirmRequest} from "../controllers/Auth.js"

const router = express.Router();

// router.get("/", Auth)
router.post("/login", login) // mapping the pages
router.post("/register", register)
router.post("/logout", logout)
router.post("/vehicle", vehicle) 
router.get("/vehicleShow", vehicleShow)
router.get("/vehicleSearch", vehicleSearch)
router.delete('/vehicleShow/:id', VehicleDelete);
router.get('/vehicleById', vehicleByID);
router.post("/vehicleUpdate", vehicleUpdate);
router.get("/requestRides", requestRides);
router.get("/getTrips", trips)
router.get("/getVehicle", getVehicle)
router.post("/postTrip", postTrip)
router.post("/booking", tripBooking)
router.get("/getPendingRequests", PendingRequest)
router.post("/confirmRequest", ConfirmRequest)


export default router