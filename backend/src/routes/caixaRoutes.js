import express from "express";
import CaixaController from "../controllers/CaixaController.js";

const router = express.Router();

router.get("/status", CaixaController.getCaixaStatus);
router.post("/close", CaixaController.closeCaixa);

router.post("/", CaixaController.createCaixa);
router.get("/", CaixaController.getAllCaixas);

router.get("/:id", CaixaController.getCaixaById);
router.post("/:id/movimento", CaixaController.addMovimento);

export default router; 