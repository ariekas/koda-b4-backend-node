import { listHistory } from "../../repositorys/history.js";

export async function getListHistory(req, res) {
    try {
    const userId = req.jwtPaload.id; 

        const history = await listHistory(userId)

        res.status(200).json({
            success: true,
            message: "success get list history",
            data: history
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Server",
            error: error.message,
          });
    }
}