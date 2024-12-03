import express from "express";
import ExameController from "../controllers/ExameController.js";

const router = express.Router();

router.post("/", ExameController.createExame);
router.get("/", ExameController.getAllExames);
router.get("/paciente/:pacienteId", ExameController.getExamesByPacienteId);
router.get("/:id", ExameController.getExameById);
router.put("/:id", ExameController.updateExame);
router.delete("/:id", ExameController.deleteExame);
router.post("/batch-status", ExameController.updateBatchStatus);

export default router; 