import {db} from "../connect.js"
import jwt from "jsonwebtoken"


export const register = (req,res)=>{
    // CHECK  IF USER EXISTS
    const query = "SELECT Email from User WHERE Email = ?"
    const userEmail = req.body.email;

    db.query(query, [userEmail], (err, result)=>{
        if(err) return res.status(500).json(err)
        if(result.length) return res.status(409).json("User Already Exists")
        else{
            // CREATE NEW USER
            const userName = req.body.name
            const userPhone = req.body.phone
            const userAddress = req.body.address
            const userCity = req.body.city
            const userState = req.body.state
            const userCountry = req.body.country
            const userPassword = req.body.password

            const sqlInsert = "INSERT INTO User (Email, Name, Phone, Address, City, State, Country, Password) VALUES (?,?,?,?,?,?,?,?)"
            const values = [userEmail, userName, userPhone, userAddress, userCity, userState, userCountry, userPassword]

            db.query(sqlInsert, values, (err, result) => {
                console.log(err);
                if(err) return res.status(500).json(err);
                return res.status(200).json("User has been created.")
            })
        }
    })
}

export const login = (req,res)=>{
    // CHECK FOR PASSWORD
    const query = "SELECT * FROM User WHERE email = ?"
    const userEmail = req.body.email[0];
    db.query(query,[userEmail], (err,result)=>{
        if(err) return res.status(500).json(err)
        if(result.length == 0) return res.status(500).json("User not found")
        const currPassword = result[0].Password
        const checkPassword = req.body.password
        if(currPassword!=checkPassword) return res.status(500).json("Wrong password")

        const Id = result[0].CustomerID
        var owner = false
        const query2 = "SELECT VehicleID, OwnerID from Vehicle WHERE OwnerID = ?"
        db.query(query2,Id, (err, result2)=>{
            if(err) return res.status(500).json(err)
            if(result2.length != 0) owner = true
            const data = [userEmail,Id,owner]
            // JWT part create a token with email which we will store in our cookie so that each page can access it
            const token = jwt.sign({id:data},"mysecretkey")
            return res.cookie("access_token",token,{httpOnly:true}).status(200).json(data)
        })
    })
}

export const logout = (req,res)=>{
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    })
    res.status(204).json("User has been logged out.")
}

export const vehicleShow = (req,res)=>{
    // CHECK FOR PASSWORD
    console.log('at show')
    //const query  = "SELECT CarName, VehicleID, CarType, NoOfSeats, Color, RegistrationNumber, ROUND(AvgRating,2) as AvgRating FROM (SELECT VehicleID, Sum(Rating)/count(Rating) AS AvgRating FROM RatesAndReviews NATURAL JOIN (SELECT TripID, VehicleID FROM Trips WHERE Status = 'Past' AND VehicleID IN (SELECT VehicleID FROM Vehicle WHERE OwnerID = (Select CustomerID from User where email = ?))) AS t Group BY VehicleID) AS t NATURAL JOIN Vehicle";
    const query  = "SELECT CarName, Vehicle.VehicleID, CarType, NoOfSeats, Color, RegistrationNumber, ROUND(AvgRating,2) as AvgRating FROM (SELECT VehicleID, Sum(Rating)/count(Rating) AS AvgRating FROM RatesAndReviews NATURAL JOIN (SELECT TripID, VehicleID FROM Trips WHERE Status = 'Past' AND VehicleID IN (SELECT VehicleID FROM Vehicle WHERE OwnerID = (Select CustomerID from User where email = ?))) AS t Group BY VehicleID) AS S RIGHT JOIN Vehicle on S.VehicleID = Vehicle.VehicleID WHERE Vehicle.VehicleID IN (SELECT VehicleID FROM Vehicle WHERE OwnerID = (Select CustomerID from User where email = ?))";

    console.log(req.query.email)
    const ownerEmail = req.query.email;
    
    db.query(query,[ownerEmail, ownerEmail] , (err,result)=>{
        console.log(result)
        if(err) return res.status(500).json(err)
        return res.status(200).json(result);
    })
}

export const vehicle = (req,res)=>{

    // CREATE NEW USER
    const ownerEmail = req.body.ownerEmail
    const carName = req.body.carName
    const carType = req.body.carType
    const registrationNumber = req.body.registrationNumber
    const licenseNumber = req.body.licenseNumber
    const color = req.body.color
    const noOfSeats = req.body.noOfSeats
    
    const sqlInsert = "INSERT INTO Vehicle (OwnerID, CarName, CarType, RegistrationNumber, LicenseNumber, Color, NoOfSeats) VALUES ((SELECT CustomerID FROM User where email = ?) ,?,?,?,?,?,?)"
    const values = [ownerEmail, carName, carType, registrationNumber, licenseNumber, color, noOfSeats]
    
    db.query(sqlInsert, values, (err, result) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json("Vehicle has been added.")
    });
}

export const vehicleUpdate = (req,res) => {

    const carName = req.body.carName
    const carType = req.body.carType
    const registrationNumber = req.body.registrationNumber
    const licenseNumber = req.body.licenseNumber
    const color = req.body.color
    const noOfSeats = req.body.noOfSeats
    const vehicleID = req.body.vehicleID


    const sqlUpdate = "UPDATE Vehicle set CarName = ?, CarType = ?, RegistrationNumber = ?, LicenseNumber = ?, Color = ?, NoOfSeats = ? WHERE VehicleID = ?"
    const values = [carName, carType, registrationNumber, licenseNumber, color, noOfSeats, vehicleID]
    console.log(values)
    db.query(sqlUpdate, values, (err, result) =>{
        if(err) return res.status(500).json(err);

        return res.status(200).json("Vehicle has been updated.")
    } )
}

export const VehicleDelete = (req,res) => {

    const sqlInsert = "DELETE FROM Vehicle WHERE VehicleID = ?"
    const values = [req.params.id]
    db.query(sqlInsert, values, (err, result) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json("Vehicle has been deleted.")
    });
}

export const vehicleSearch = (req, res) => {
    // const query = "SELECT * from Vehicle where OwnerID = (Select CustomerID from User where email = ?) AND CarName LIKE ?"
    //const query  = "SELECT CarName, VehicleID, CarType, NoOfSeats, Color, RegistrationNumber, ROUND(AvgRating,2) as AvgRating FROM (SELECT VehicleID, Sum(Rating)/count(Rating) AS AvgRating FROM RatesAndReviews NATURAL JOIN (SELECT TripID, VehicleID FROM Trips WHERE Status = 'Past' AND VehicleID IN (SELECT VehicleID FROM Vehicle WHERE OwnerID = (Select CustomerID from User where email = ?))) AS t Group BY VehicleID) AS t RIGHT JOIN Vehicle WHERE CarName LIKE ? AND OwnerID In (Select CustomerID from User where email = ?)";
    const query  = "SELECT CarName, Vehicle.VehicleID, CarType, NoOfSeats, Color, RegistrationNumber, ROUND(AvgRating,2) as AvgRating FROM (SELECT VehicleID, Sum(Rating)/count(Rating) AS AvgRating FROM RatesAndReviews NATURAL JOIN (SELECT TripID, VehicleID FROM Trips WHERE Status = 'Past' AND VehicleID IN (SELECT VehicleID FROM Vehicle WHERE OwnerID = (Select CustomerID from User where email = ?))) AS t Group BY VehicleID) AS S RIGHT JOIN Vehicle on S.VehicleID = Vehicle.VehicleID WHERE Vehicle.VehicleID IN (SELECT VehicleID FROM Vehicle WHERE OwnerID = (Select CustomerID from User where email = ?) AND carName LIKE ?)";
    
    const ownerEmail = req.query.email;
    const searchKey = "%"  + req.query.searchKey + "%";
    
    db.query(query,[ownerEmail, ownerEmail, searchKey] , (err,result)=>{
        if(err) return res.status(500).json(err)        
        return res.status(200).json(result);
    })
}

export const vehicleByID = (req, res) => {
    const query = "SELECT * from Vehicle where VehicleID = ?"
    const vehicleID = req.query.id;
    
    db.query(query,[vehicleID] , (err,result)=>{
        if(err) return res.status(500).json(err)        
        return res.status(200).json(result);
    })
}

export const requestRides = (req, res) => {
    const srcLat = parseFloat(req.query.sourceLat)
    const srcLong = req.query.sourceLong
    const DestLat = req.query.destLat
    const DestLong = req.query.destlong
    const MileLat = 0.06605566996
    const MileLong = 0.02105566996
    const sourceLatMinus = srcLat - MileLat
    const sourceLatPlus = srcLat + MileLat
    const destinationLatMinus = DestLat - MileLat
    const destinationLatPlus = DestLat + MileLat
    const sourceLongPlus = srcLong + MileLong
    const sourceLongMinus = srcLong - MileLong
    const destinationLongPlus = DestLong + MileLong
    const distinationLongMinus = DestLong - MileLong
    const requestTime = req.query.requestTime
    const requestDate = req.query.requestDate
    const requestDateTime = requestDate + " " + requestTime + ":00"
    console.log(requestDateTime, srcLat, srcLong, DestLat, DestLong)

// 40.0890390566996 
    // -88.1638343471284
    // 40.1321952231074
    // -88.303030555667

    // const query = "select TripID, Source, Destination, Name as DriverName, NoOfSeats as seats FROM User INNER JOIN Vehicle ON User.CustomerID = Vehicle.OwnerID INNER JOIN Trips ON Trips.VehicleID = Vehicle.VehicleID WHERE TripID in (select TripID from MapGrid where (SourceLatitude <= (?) AND SourceLatitude >= (?)) and (SourceLongitude <= (?) AND SourceLatitude >= (?)) and (DestinationLatitude <= (?) AND DestinationLatitude >= (?)) and (DestinationLongitude <= (?) AND DestinationLongitude >= (?)));"
    const query = "CALL getTripsNearby(?,?,?,?,?);"
    // const values = [sourceLatPlus, sourceLatMinus, sourceLongPlus, sourceLongMinus, destinationLatPlus, destinationLatMinus, destinationLongPlus, distinationLongMinus]
    const values = [requestDateTime,srcLat,srcLong,DestLat,DestLong]
    db.query(query, values, (err,result) =>{
        console.log(result)
        if(err) return res.status(500).json(err)
        return res.status(200).json(result)
    })

}

export const trips = (req, res) =>{
    console.log("reached here for trips")
    console.log(req)
    console.log("passed req print here")
    const query = "select Source, Destination,Time from Trips where TripID in (select TripID from Rides where RiderID = ?) and status = 'upcoming'"
    const id = req.query.id
    db.query(query, [id], (err,result)=>{
        console.log(result, id)
        console.log("after res print")
        if(err) return res.status(500).json(err)
        if(result.length==0) return res.status(200).json("No upcoming trips")
        return res.status(200).json(result)
    })
}

export const getVehicle = (req, res)=>{
    const query = "select VehicleId, CarName from Vehicle where OwnerID=?"
    const id = req.query.id
    db.query(query, [id], (err,result)=>{
        if(err) return res.status(500).json(err)
        if(result.length==0) return res.status(200).json("No Vehicle")
        return res.status(200).json(result)
    })
}


export const postTrip = (req, res)=>{
    console.log("reached this line")
    const tripDate = req.body.tripDate[0]
    const tripTime = req.body.tripTime[0]
    const tripSource = req.body.tripSource
    const tripDestination = req.body.tripDestination
    const tripVehicle = req.body.tripVehicle[0]
    const srcLat = req.body.srclat
    const srcLong = req.body.srclong
    const destLat = req.body.destlat
    const destlong = req.body.destlong

    var seats = ""
    const dateTime = tripDate +" "+tripTime
    const status = "upcoming"
    const query1 = "select NoOfSeats from Vehicle where VehicleID=?"
    console.log(tripVehicle)
    db.query(query1, tripVehicle, (err,result)=>{
        if(err) {
            console.log(err)
            return res.status(500).json(err)
        }
        seats = result[0].NoOfSeats
        const query2 = "insert into Trips (VehicleID, Date, Time, Source, Destination, Seats, Status) values (?,?,?,?,?,?,?)"
        db.query(query2,[tripVehicle,tripDate,dateTime, tripSource, tripDestination, seats, status],(err,result2)=>{
            console.log("main",err)
            if(err) return res.status(500).json(err);
            
            const tripID = result2.insertId
            const query3 = "INSERT INTO MapGrid (TripID, SourceLatitude, DestinationLatitude, SourceLongitude, DestinationLongitude) VALUES (?,?,?,?,?)"
            db.query(query3,[tripID,srcLat, destLat, srcLong, destlong],(err,result3)=>{
                console.log("second",err)
                if(err) return res.status(500).json(err);
                return res.status(200).json("Trip Posted Successfully.")
            });
        })
        
    })
}


export const tripBooking = (req, res) =>{
    console.log("reached here")
    const RiderID = req.body.RiderID
    const seats = req.body.seats
    const Status = "pending"
    const TripId = req.body.TripId
    console.log(RiderID, seats, Status, TripId)
    const query = "insert into Requests (RiderID, Seats, Status, TripID) values (?,?,?,?)"
    db.query(query,[RiderID, seats, Status, TripId], (err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json(err);} 
        return res.status(200).json("Request sent successfully")
    })

}


export const PendingRequest = (req,res)=>{
    const userid = req.query.id
    console.log(userid)
    const query = "Select r.RequestID, t.Source, t.Destination, t.Time, t.Date, r.Seats, v.CarName, User.Name FROM Trips t join Requests r on t.TripID = r.TripID Join Vehicle v on t.VehicleId = v.VehicleId join User on r.RiderId = User.CustomerId where v.VehicleId in (Select VehicleId from Vehicle where OwnerId = ?) and r.Status='pending'"
    db.query(query, userid, (err,result)=>{
        console.log(result)
        if(err){return res.status(500).json(err);}
        if (result.length==0) return res.status(500).json("No pending requests")
        console.log("suraj is chad", result)
        return res.status(200).json(result)
    })
}

export const ConfirmRequest = (req,res)=>{
    const RequestId = req.body.rideId;
    const query = "Update Requests set Status='accepted' where RequestID=?";
    db.query(query, RequestId, (err,result)=>{
        if(err){return res.status(500).json(err);}
        return res.status(200).json("Ride confirmed successfully");
    })
}