const express = require("express");
const UserController = require("../controllers/ControleAcesso");

const router = express.Router();

router.post("/login", UserController.createUser, UserController.login); // Rota para login
//router.get("/", UserController.getAllUsers); // Rota para obter todos os usuários
//router.get("/:id", UserController.getUserById); // Rota para obter um usuário por ID
//router.put("/:id", UserController.updateUser); // Rota para atualizar um usuário
//router.delete("/:id", UserController.deleteUser); // Rota para deletar um usuário

module.exports = router;
