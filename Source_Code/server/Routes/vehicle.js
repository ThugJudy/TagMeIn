import express from "express";
import { vehicle } from "../controllers/vehicle.js"

const router = express.Router();

// router.get("/", Auth)
router.post("/vehicle", vehicle) // mapping the pages

export default router