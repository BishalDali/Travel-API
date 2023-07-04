import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Connection } from "./utils/db.utils";
import { errorHandler } from "./utils/error.utils";
import routes from "./routes/index.route";
import cookieParser from "cookie-parser";
import socketServer from "./socket/index";


require("dotenv").config();
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Database Connection
Connection();

// Socket Connection
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("HTTP server running on port 8000");
});
socketServer(server);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/", routes);

app.use(errorHandler);

app.get("*", (req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "Endpoint not found",
  });
});
