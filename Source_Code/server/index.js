import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./Routes/Auth.js";


const app = express();

//middlewares 
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use("/api/users/", userRoute)

app.listen(3001, () =>{
    console.log("API is working");
});