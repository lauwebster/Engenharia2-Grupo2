import express from "express";
import FuncionarioController from "../controllers/FuncionarioController.js";

const router = express.Router();

router.post("/", FuncionarioController.createFuncionario);
router.get("/", FuncionarioController.getAllFuncionarios);
router.get("/:id", FuncionarioController.getFuncionarioById);
router.put("/:id", FuncionarioController.updateFuncionario);
router.delete("/:id", FuncionarioController.deleteFuncionario);

export default router;
