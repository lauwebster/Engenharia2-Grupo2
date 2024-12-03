import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.login);
router.get("/", UserController.getAllUsers);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.put("/:id/status", UserController.updateUserStatus);

export default router;
