import express from "express";
import TipoExameController from "../controllers/TipoExameController.js";

const router = express.Router();

router.post("/", TipoExameController.createTipoExame);
router.get("/", TipoExameController.getAllTiposExame);
router.get("/:id", TipoExameController.getTipoExameById);
router.put("/:id", TipoExameController.updateTipoExame);
router.delete("/:id", TipoExameController.deleteTipoExame);

export default router; 