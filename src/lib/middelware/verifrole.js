/**
 * Check User Role
 * @param {string[]} allowedRoles
 */
export function checkRole(allowedRoles = []) {
    return (req, res, next) => {
      const user = req.jwtPayload;
  
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "this role no have permission",
        });
      }
  
      next();
    };
  }
  