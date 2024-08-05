import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import connectDB from "./config/db";
import { ExpenseRouter } from "./routes/expenseRoutes";
import { UserRouter } from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();
const port = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use("/uploads", express.static(path.join("uploads")));

// Routes
app.use("/api/expenses", ExpenseRouter);
app.use("/api/users", UserRouter);

// Error handling middleware
app.use(errorHandler);

// Default route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start server
app.listen(port, () => {
  console.log(`🌐 Server running on http://localhost:${port}`);
});
