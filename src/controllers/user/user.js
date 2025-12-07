import { detail, updateProfile } from "../../repositorys/users.js";

/**
 * GET /user/profile
 * @summary Get logged-in user profile
 * @tags User Profile
 * @security BearerAuth
 * @return {object} 201 - Success response
 * @return {object} 404 - User not found
 * @return {object} 500 - Error response
 * @example response - 201 - Success response example
 * {
 *   "success": true,
 *   "message": "success get profile",
 *   "data": {
 *     "id": 1,
 *     "fullname": "John Doe",
 *     "email": "johndoe@example.com",
 *     "role": "user",
 *     "isActive": true,
 *     "created_at": "2024-01-01T00:00:00.000Z",
 *     "updated_at": "2024-01-01T00:00:00.000Z",
 *     "profile": {
 *       "pic": "/uploads/profile.jpg",
 *       "phone": "08123456789",
 *       "address": "Jakarta, Indonesia"
 *     }
 *   }
 * }
 * @example response - 404 - User not found
 * {
 *   "success": false,
 *   "message": "user not found"
 * }
 * @example response - 500 - Error response example
 * {
 *   "success": false,
 *   "message": "Error Server",
 *   "error": "Error message details"
 * }
 */
export async function getProfile(req, res) {
  try {
    const userId = req.jwtPayload.id;
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


/**
 * @typedef {object} UserProfileInput
 * @property {string} fullname - Fullname of user
 * @property {string} email - Email of user
 * @property {string} password - Password (optional)
 * @property {string} phone - Phone number (optional)
 * @property {string} address - Address (optional)
 * @property {string} pic - Profile picture file - binary
 */

/**
 * PATCH /user/profile
 * @summary Update logged-in user profile
 * @tags User Profile
 * @security BearerAuth
 * @param {UserProfileInput} request.body.required - User profile data - multipart/form-data
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request (invalid file type)
 * @return {object} 404 - User not found
 * @return {object} 500 - Error response
 * @example response - 200 - Success response example
 * {
 *   "success": true,
 *   "message": "success update profile",
 *   "data": {
 *     "fullname": "John Doe",
 *     "email": "johndoe@example.com",
 *     "phone": "08123456789",
 *     "address": "Jakarta, Indonesia",
 *     "pic": "/uploads/profile-123456.jpg"
 *   }
 * }
 * @example response - 400 - Invalid file type
 * {
 *   "success": false,
 *   "message": "Invalid file type. Only jpg, jpeg, png, gif are allowed"
 * }
 * @example response - 404 - User not found
 * {
 *   "success": false,
 *   "message": "user not found"
 * }
 * @example response - 500 - Error response example
 * {
 *   "success": false,
 *   "message": "Error Server",
 *   "error": "Error message details"
 * }
 */
export async function updateUser(req, res) {
  try {
    const userId = req.jwtPayload.id;
    const user = await detail(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
      return;
    }

    const updatedUser = await updateProfile(req.body, userId, req.file?.path);

    res.status(200).json({
      success: true,
      message: "success update profile",
      data: {
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        phone: updatedUser.profile?.phone,
        address: updatedUser.profile?.address,
        pic: updatedUser.profile?.pic,
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
