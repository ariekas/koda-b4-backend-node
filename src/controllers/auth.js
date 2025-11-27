import { findUser, create } from "../repositorys/auth.js";

export async function register(req, res) {
  try {
    const { fullname, email, password } = req.body;
    console.log(req.body)

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
      data : {
        fullname: user.fullname
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Register gagal",
      error: error.message,
    });
  }
}

export async function login(req, res) {
    try {
        const {fullname, email, password} = req.body

        const extUser = await findUser(email)
        if (extUser) {
            res.status(400).json({
              success: false,
              message: "Email already register",
            });
            return;
          }

    } catch (error) {
        
    }
}
