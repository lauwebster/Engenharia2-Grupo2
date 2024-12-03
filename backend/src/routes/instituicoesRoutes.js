import express from "express";
import InstituicoesController from "../controllers/InstituicoesController.js";

const router = express.Router();

router.post("/", InstituicoesController.createInstituicao);
router.get("/", InstituicoesController.getAllInstituicoes);
router.get("/:id", InstituicoesController.getInstituicaoById);
router.put("/:id", InstituicoesController.updateInstituicao);
router.delete("/:id", InstituicoesController.deleteInstituicao);

export default router; 