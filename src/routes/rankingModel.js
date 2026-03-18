import express from "express";
import * as rankingController from "../controllers/rankingController.js";

const router = express.Router();

router.get("/geral", rankingController.rankingGeral);
router.get("/jogo/:jogoId", rankingController.rankingPorJogo);

export default router;