// controllers/UserController.js
const User = require("../models/UsuarioModel");
//const bcrypt = require("bcryptjs"); // Para hash de senha
//const jwt = require("jsonwebtoken"); // Para gerar token JWT

class UserController {
  static async createUser(req, res) {
    try {
      //const { name, email, password } = req.body;
      const nome = 'Cássia Perego';
      const email = 'cassia@unoeste.br';
      const senha = '123';
      const status = 1;
      const permissao = 1;
      // Verifica se o email já existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      const newUser = await User.create({ nome, email, senha, status, permissao});
      console.log("Deu certo: " + newUser);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const user = await User.findByEmail(email);
      console.log("Bateu aqui");
      if (!user) {
        return res.status(400).json({ error: "Credenciais inválidas" });
      }

      // Verifica se a senha está correta
      const isMatch = await User.comparaSenha(email, senha);
      if (!isMatch) {
        console.log("IsMatch"  + isMatch);
        return res.status(400).json({ error: "Credenciais inválidas" });
      }
      
      res.status(200).json({ message: "Login bem-sucedido"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await User.update(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      await User.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
