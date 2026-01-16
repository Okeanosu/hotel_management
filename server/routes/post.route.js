import express from "express";
import {
  getPost,
  getAllPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.contoller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/:id", getPost);
router.get("/", getAllPost);
router.post("/create", verifyToken, createPost);
router.put("/update/:id", verifyToken, updatePost);
router.delete("/delete/:id", verifyToken, deletePost);

export default router;
