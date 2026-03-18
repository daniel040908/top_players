import { Router } from "express"
import * as playerControllers from "../controllers/playerControllers.js"

const router = Router()

router.get("/", playerControllers.listar)
router.get("/:id", playerControllers.buscarPlayer)
router.post("/", playerControllers.criar)
router.delete("/:id", playerControllers.deletar)

export default router