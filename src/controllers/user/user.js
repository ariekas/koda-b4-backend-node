import { detail } from "../../repositorys/users.js";

export async function getProfile(req, res) {
  try {
    const userId = req.jwtPaload.id;
    const user = await detail(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "success get profile",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}
