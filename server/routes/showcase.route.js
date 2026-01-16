import express from "express";
import {
  getShowcase,
  getAllShowcase,
  createShowcase,
  deleteShowcase,
} from "../controllers/showcase.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/:id", getShowcase);
router.get("/", getAllShowcase);
router.post("/create", verifyToken, createShowcase);
router.delete("/delete/:id", verifyToken, deleteShowcase);

export default router;
