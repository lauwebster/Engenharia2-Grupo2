import express from "express";
import MotoristaController from "../controllers/MotoristaController.js";

const router = express.Router();

router.post("/", MotoristaController.createMotorista);
router.get("/", MotoristaController.getAllMotoristas);
router.get("/:id", MotoristaController.getMotoristaById);
router.put("/:id", MotoristaController.updateMotorista);
router.delete("/:id", MotoristaController.deleteMotorista);

export default router; 