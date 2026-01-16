import express from "express";
import {
  getFood,
  getAllFood,
  createFood,
  deleteFood,
} from "../controllers/food.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/:id", getFood);
router.get("/", getAllFood);
router.post("/create", verifyToken, createFood);
router.delete("/delete/:id", verifyToken, deleteFood);

export default router;
