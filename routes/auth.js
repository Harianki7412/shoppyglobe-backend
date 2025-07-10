import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Register route
router.post("/register", async (req, res, next) => {
  const { name, gmail, password } = req.body;

  if (!name || !gmail || !password) {
    return res.status(400).json({ message: "Name, gmail and password are required" });
  }

  try {
    const userExists = await User.findOne({ gmail: gmail.toLowerCase().trim() });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name.trim(),
      gmail: gmail.toLowerCase().trim(),
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
});

// Login route
router.post("/login", async (req, res, next) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(400).json({ message: "Gmail and password are required" });
  }

  try {
    const user = await User.findOne({ gmail: gmail.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const payload = {
      userId: user._id,
      name: user.name,
      gmail: user.gmail,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

export default router;