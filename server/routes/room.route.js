import express from "express";
import {
  getRoom,
  getAllRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/:id", getRoom);
router.get("/", getAllRoom);
router.post("/create", verifyToken, createRoom);
router.put("/update/:id", verifyToken, updateRoom);
router.delete("/delete/:id", verifyToken, deleteRoom);

export default router;
