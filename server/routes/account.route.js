import express from "express";
import {
  getAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/account.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/:id", verifyToken, getAccount);
router.put("/update/:id", verifyToken, updateAccount);
router.delete("/delete/:id", verifyToken, deleteAccount);

export default router;
