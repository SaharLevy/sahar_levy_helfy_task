import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasksRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/tasks", tasksRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Task Manager API running on http://localhost:${PORT}`);
});
