import express from "express";
import {
  getTour,
  getAllTour,
  createTour,
  updateTour,
  deleteTour,
} from "../controllers/tour.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/:id", getTour);
router.get("/", getAllTour);
router.post("/create", verifyToken, createTour);
router.put("/update/:id", verifyToken, updateTour);
router.delete("/delete/:id", verifyToken, deleteTour);

export default router;
