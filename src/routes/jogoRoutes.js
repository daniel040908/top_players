import { Router } from "express"
import * as jogoControllers from "../controllers/jogoControllers.js"

const router = Router()

router.get("/", jogoControllers.listar)
router.get("/:id", jogoControllers.buscarJogos)
router.post("/", jogoControllers.criar)
router.put("/:id", jogoControllers.atualizar)
router.delete("/:id", jogoControllers.deletar)

export default router