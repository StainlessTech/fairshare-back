import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Fair Share API is running.");
});

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("DB error:", err));

app.use("/api", router);

app.use((req, res, next) => {
    res.status(404).json({error: "Route not found"});
});

const PORT = process.env.PORT || 5000
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${PORT}`);
});
