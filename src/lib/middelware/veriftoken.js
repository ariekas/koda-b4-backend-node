import process from "process";
import jwt from "jsonwebtoken";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function verifToken(req, res, next) {
  const bearer = req.headers?.authorization ?? "";
  const prefix = "Bearer ";
  
  if (!bearer.startsWith(prefix)) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - No token provided",
    });
  }
  
  const token = bearer.substring(prefix.length);
  
  try {
    const payload = jwt.verify(token, process.env.APP_SECRET);
    console.log(payload)
    req.jwtPayload = payload; 
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
      error: error.message,
    });
  }
}