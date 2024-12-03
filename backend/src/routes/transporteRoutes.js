import express from "express";
import TransporteController from "../controllers/TransporteController.js";

const router = express.Router();

router.post("/", TransporteController.createTransporte);
router.get("/", TransporteController.getAllTransportes);
router.get("/:id", TransporteController.getTransporteById);
router.put("/:id", TransporteController.updateTransporte);
router.delete("/:id", TransporteController.deleteTransporte);

export default router; 