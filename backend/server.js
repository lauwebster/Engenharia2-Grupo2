import express from "express";
import cors from "cors";
import mountRoutes from "./src/routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost", "http://localhost:80"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
mountRoutes(app);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.listen(PORT, () => {});
