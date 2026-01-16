import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// Routes
import accountRoute from "./routes/account.route.js";
import authRoute from "./routes/auth.route.js";
import bannerRoute from "./routes/banner.route.js";
import roomRoute from "./routes/room.route.js";
import bookingRoute from "./routes/booking.route.js";
import contactRoute from "./routes/contact.route.js";
import foodRoute from "./routes/food.route.js";
import showcaseRoute from "./routes/showcase.route.js";
import imageRoute from "./routes/image.route.js";
import postRoute from "./routes/post.route.js";
import tourRoute from "./routes/tour.route.js";

// Load env variables FIRST
dotenv.config();

const app = express();

/* =======================
   Cloudinary config
======================= */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export { cloudinary };

/* =======================
   MongoDB connection
======================= */
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

/* =======================
   Middlewares
======================= */
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

/* =======================
   Routes
======================= */
app.use("/api/v1/account", accountRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/banner", bannerRoute);
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/food", foodRoute);
app.use("/api/v1/showcase", showcaseRoute);
app.use("/api/v1/image", imageRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/tour", tourRoute);

/* =======================
   Error handler
======================= */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({ message });
});

/* =======================
   Start server
======================= */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Backend server running on port ${PORT}`);
});
