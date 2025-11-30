import { findUser, create, saveOtp, resetPassword } from "../repositorys/users.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import bcrypt from "bcrypt";
import { sendToEmail } from "../lib/config/sendopt.js";

export async function register(req, res) {
  try {
    if (req.body.password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password minimal 6 karakter",
      });
    }

    const extUser = await findUser(req.body.email);
    if (extUser) {
      res.status(400).json({
        success: false,
        message: "Email already register",
      });
      return;
    }

    const user = await create(req.body);
    res.status(201).json({
      success: true,
      message: "Success register",
      data: {
        fullname: user.fullname,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const user = await findUser(req.body.email);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
    res.status(401).json({
        success: false,
        message: "Wrong password",
      });
      return
    }    

    const token = jwt.sign({id: user.id}, process.env.APP_SECRET, {
        expiresIn: "1d"
    })

    res.status(200).json({
        success: true,
        message: "Login berhasil",
        data: {
          token
        }
      });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error Server",
        error: error.message,
      });
  }
}


export async function forgetPassword(req, res) {
  try {
    const user = await findUser(req.body.email)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await saveOtp(req.body.email, otp)

    await sendToEmail.sendMail({
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Reset Password OTP",
      html: `
      <h3>Kode OTP Reset Password</h3>
      <p>Gunakan OTP berikut untuk reset password:</p>
      <h2>${otp}</h2>
      <p>Kode ini berlaku selama <b>10 menit</b>.</p>
    `,
    })

    return res.json({
      success: true,
      message: "success OTP has been sent to your email.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}

export async function resetPasswordUser(req, res) {
  try {
    const user = await findUser(req.body.email)

    if (!user || !user.resetOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    if (new Date() > new Date(user.resetOtpExpires)) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (req.body.newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    await resetPassword(req.body.emai, req.body.newPassword)

    res.json({
      success: true,
      message: "Password successfully reset",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}