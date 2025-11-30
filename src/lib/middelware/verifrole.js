/**
 * Check User Role
 * @param {string} allowedRoles - Single role or array of roles
 */
export function checkRole(allowedRoles) {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  return (req, res, next) => {
    const user = req.jwtPayload; 

    if (!user || !user.role) {
      return res.status(403).json({
        success: false,
        message: "No role found in token",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "This role does not have permission",
      });
    }
    next();
  };
}