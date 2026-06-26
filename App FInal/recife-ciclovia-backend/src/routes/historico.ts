import { Router } from "express";
import { saveHistorico, getHistorico } from "../controllers/historicoController";

const router = Router();

router.post("/", saveHistorico);   // POST /historico
router.get("/", getHistorico);     // GET  /historico

export default router;