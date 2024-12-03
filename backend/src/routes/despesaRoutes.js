import express from "express";
import DespesaController from "../controllers/DespesaController.js";

const router = express.Router();

router.post("/", DespesaController.createDespesa);
router.get("/", DespesaController.getAllDespesas);
router.get("/:id", DespesaController.getDespesaById);
router.put("/:id", DespesaController.updateDespesa);
router.patch("/:id/status", DespesaController.updateDespesaStatus);
router.delete("/:id", DespesaController.deleteDespesa);

export default router; 