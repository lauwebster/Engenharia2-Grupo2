import express from "express";
import DoacaoController from "../controllers/DoacaoController.js";

const router = express.Router();

router.post("/", DoacaoController.createDoacao);
router.get("/", DoacaoController.getAllDoacoes);
router.get("/:id", DoacaoController.getDoacaoById);
router.put("/:id", DoacaoController.updateDoacao);
router.delete("/:id", DoacaoController.deleteDoacao);

export default router; 