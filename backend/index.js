import "dotenv/config";
import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

const app = express();

// 1. CORS Configuration (The ONLY block you need)
// This allows your frontend (CLIENT_URL) to send requests with cookies/tokens.
app.use(cors({ 
  origin: process.env.CLIENT_URL, 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. Webhooks (Must come before express.json())
app.use("/webhooks", webhookRouter);

// 3. Body Parser (Read JSON data from requests)
app.use(express.json());

// 4. Clerk Authentication Middleware
app.use(clerkMiddleware());

// --- ROUTES ---
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// --- ERROR HANDLER ---
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

// --- SERVER START ---
app.listen(3000, () => {
  connectDB();
  console.log("Server is running!");
});