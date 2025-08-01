import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  workspaceName: { type: String, required: true },
  workspaceUrl: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

// ✅ FIXED ROUTE
app.post("/api/users/register", async (req, res) => {
  try {
    const { password, workspaceName, workspaceUrl } = req.body;

    if (!password || !workspaceName || !workspaceUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ workspaceUrl });
    if (existingUser) {
      return res.status(400).json({ message: "Workspace URL already in use" });
    }

    const newUser = new User({ password, workspaceName, workspaceUrl });
    await newUser.save();

    res.status(201).json({ message: "Workspace created successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
