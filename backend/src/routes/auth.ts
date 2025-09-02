import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateOTP, saveOTP, verifyOTP } from "../utils/otp.js";
import nodemailer from "nodemailer";
import { verifyGoogleIdToken } from "../utils/googleVerify.js";

const router = Router();

function signToken(payload: any) {
  const secret = process.env.JWT_SECRET || "secret123";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

// send OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "This email is already registered. Please sign in." });
    }
    const otp = generateOTP();
    saveOTP(email, otp, Number(process.env.OTP_EXPIRY_MIN || 10));

    if (process.env.EMAIL_USER) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for Notes App",
        text: `Your OTP is ${otp}`
      });
    } 

    return res.json({ message: "OTP sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, name } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });
    const ok = verifyOTP(email, otp);
    if (!ok) return res.status(400).json({ message: "Invalid or expired OTP" });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name });
    }
    const token = signToken({ userId: user._id, email: user.email, name: user.name });

    return res.json({ token, user: { email: user.email, name: user.name, id: user._id } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "OTP verification failed" });
  }
});


router.post("/login-send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });


    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found. Please create an account." });
    }

    const otp = generateOTP();
    saveOTP(email, otp, Number(process.env.OTP_EXPIRY_MIN || 10));

    if (process.env.EMAIL_USER) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Login OTP for HD App",
        text: `Your OTP to sign in is ${otp}`
      });
    } 

    return res.json({ message: "OTP sent for login" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});


router.post("/login-verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

    const ok = verifyOTP(email, otp);
    if (!ok) return res.status(400).json({ message: "Invalid or expired OTP" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const token = signToken({ userId: user._id, email: user.email, name: user.name });

    return res.json({ token, user: { email: user.email, name: user.name, id: user._id } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "OTP verification failed" });
  }
});


router.post("/google-login", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "Google ID Token is required" });

    const payload = await verifyGoogleIdToken(idToken);
    if (!payload || !payload.email) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    const { email, name } = payload;
    
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, name: name || 'Google User' });
    }
    
    const token = signToken({ userId: user._id, email: user.email, name: user.name });

    return res.json({ token, user: { email: user.email, name: user.name, id: user._id } });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Google login failed" });
  }
});

export default router;
