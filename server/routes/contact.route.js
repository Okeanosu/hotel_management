import express from "express";
import {
  getAllContact,
  createContact,
} from "../controllers/contact.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getAllContact);
router.post("/create", verifyToken, createContact);

export default router;
