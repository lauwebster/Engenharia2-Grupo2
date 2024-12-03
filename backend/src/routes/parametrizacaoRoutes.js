import ParametrizacaoController from "../controllers/ParametrizacaoController.js";
import express from "express";

const router = express.Router();

router.get("/", ParametrizacaoController.getAllParametrizacoes);
router.post("/", ParametrizacaoController.createParametrizacao);
router.get("/:id", ParametrizacaoController.getParametrizacaoById);
router.put("/:id", ParametrizacaoController.updateParametrizacao);
router.delete("/:id", ParametrizacaoController.deleteParametrizacao);

export default router;
