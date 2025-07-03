import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";
import passwordRoutes from "./routes/password_routes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
const port = process.env.PORT;
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("auth");
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/passwords", passwordRoutes);

app.use(errorHandlerMiddleware);
(async () => {
  await connectDB(process.env.MONGO_URI);
  console.log("Connected to DB");
  app.listen(port, () => {
    console.log(`Server running on port localhost:${port}`);
  });
})();
