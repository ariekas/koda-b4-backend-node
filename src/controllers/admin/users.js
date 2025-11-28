import { list, updateRole, detail } from "../../repositorys/admin/users.js";

export async function updateRoleUser(req, res) {
    try {
         await updateRole(req.body, req.params.id)
        
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

export async function listUser(req, res) {
    try {
        
        const user = await list()
        res.status(201).json({
            success: true,
            message: "success getting detail user",
            data : user
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Server",
            error: error.message,
          });
    }
}