import { findUser, create } from "../repositorys/auth.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import process from "process";
import bcrypt from "bcrypt";

export async function register(req, res) {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "fullname, email dan password wajib diisi",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password minimal 6 karakter",
      });
    }

    const extUser = await findUser(email);
    if (extUser) {
      res.status(400).json({
        success: false,
        message: "Email already register",
      });
      return;
    }
    const user = await create(fullname, email, password);
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
    const { email, password } = req.body;

    const user = await findUser(email);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
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
