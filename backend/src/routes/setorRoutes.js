import express from "express";
import SetorController from "../controllers/SetorController.js";

const router = express.Router();

router.post("/", SetorController.createSetor);
router.get("/", SetorController.getAllSetores);
router.post("/repasse", SetorController.createRepasse);
router.get("/repasses", SetorController.getRepasses);

export default router; 