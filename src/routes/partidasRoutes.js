import express from "express";
import * as partidasController from "../controllers/partidasController.js";

const router = express.Router();

router.get("/", partidasController.listar);
router.post("/", partidasController.criar);
router.delete("/:id", partidasController.deletar);

export default router;