import express from "express";
import PacientesController from "../controllers/PacientesController.js";

const router = express.Router();

router.post("/", PacientesController.createPaciente);
router.get("/", PacientesController.getAllPacientes);
router.get("/:id", PacientesController.getPacienteById);
router.put("/:id", PacientesController.updatePaciente);
router.delete("/:id", PacientesController.deletePaciente);

export default router; 