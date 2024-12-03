import express from "express";
import VeiculosController from "../controllers/VeiculoController.js";

const router = express.Router();

router.post("/", VeiculosController.createVeiculo);
router.get("/", VeiculosController.getAllVeiculos);
router.get("/:id", VeiculosController.getVeiculoById);
router.put("/:id", VeiculosController.updateVeiculo);
router.delete("/:id", VeiculosController.deleteVeiculo);

export default router; 