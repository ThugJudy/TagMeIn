import {db} from "../connect.js"

export const vehicle = (req,res)=>{

    // CREATE NEW USER
    const ownerId = req.body.ownerId
    const carName = req.body.carName
    const carType = req.body.carType
    const registrationNumber = req.body.registrationNumber
    const licenseNumber = req.body.licenseNumber
    const color = req.body.color
    const noOfSeats = req.body.noOfSeats
    const sqlInsert = "INSERT INTO Vehicle (VehicleID, OwnerID, CarName, CarType, RegistrationNumber, LicenseNumber, Color, NoOfSeats) VALUES (?,?,?,?,?,?,?,?)"
    const values = [1000005, ownerId, carName, carType, registrationNumber, licenseNumber, color, noOfSeats]
    
    db.query(sqlInsert, values, (err, result) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json("Vehicle has been added.")
    });
}