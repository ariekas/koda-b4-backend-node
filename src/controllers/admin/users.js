import pagination from "../../lib/config/pagination.js";
import { invalidateCache } from "../../lib/middelware/invalidatecache.js";
import { list, updateRole, detail, getUserInactive } from "../../repositorys/users.js";

const pathRedis = "cache:/admin/user*"

/**
 * @typedef {object} UpdateRoleRequest
 * @property {string} role.required - Role user baru - enum:user,admin
 */

/**
 * PATCH /admin/user/role/{id}
 * @summary Update role user
 * @tags Admin User
 * @security BearerAuth
 * @param {number} id.path.required - User ID
 * @param {UpdateRoleRequest} request.body.required - Payload untuk update role
 * @return {object} 201 - Success response
 * @return {boolean} 201.success
 * @return {string} 201.message
 * @return {object} 500 - Server error
 * @return {boolean} 500.success
 * @return {string} 500.message
 * @return {string} 500.error - Error details
 */
export async function updateRoleUser(req, res) {
    try {
         await updateRole(req.body, req.params.id)
        
        await invalidateCache(pathRedis)

        res.status(201).json({
            success: true,
            message: "success update role",
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
 * @typedef UserDetailResponse
 * @property {number} id
 * @property {string} fullname
 * @property {string} email
 * @property {("user"|"admin")} role
 * @property {boolean} isActive
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * GET /admin/user/{id}
 * @summary Get detail user
 * @tags Admin User
 * @security BearerAuth
 * @param {number} id.path.required - User ID
 * @return {UserDetailResponse} 201 - success response
 * @return {object} 500 - server error
 */
export async function detailUser(req, res) {
    try {
        const user = await detail(req.params.id)

        res.status(201).json({
            success: true,
            message: "success getting detail user",
            data: user
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
 * @typedef UserListItem
 * @property {number} id
 * @property {string} fullname
 * @property {string} email
 * @property {("user"|"admin")} role
 * @property {boolean} isActive
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef UserListResponse
 * @property {UserListItem[]} data
 * @property {number} totalItems
 * @property {number} page
 * @property {number} limit
 * @property {string} next
 * @property {string} prev
 */

/**
 * GET /admin/users
 * @summary Get list of users
 * @tags Admin User
 * @security BearerAuth
 * @param {number} page.query - Page number
 * @param {number} limit.query - Items per page
 * @return {UserListResponse} 201 - success response
 * @return {object} 500 - server error
 */
export async function listUser(req, res) {
    try {
        let {page =1, limit = 10} = req.query
        page = parseInt(page)
        limit = parseInt(limit)

        const {data, totalItems}= await list(page, limit)
        
        const hateoas = pagination("/admin/users", page, limit, totalItems)

        res.status(201).json({
            success: true,
            message: "success getting detail user",
            ...hateoas,
            data 
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Server",
            error: error.message,
          });
    }
}

  export async function sendUserInactive(req, res) {
    try {
      const total = await getUserInactive(); 

      console.log(total)
  
      return res.json({
        success: true,
        message: "Check inactive users done",
        totalDeactivated: total,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  