// controllers/UserController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Para hash de senha
const jwt = require("jsonwebtoken"); // Para gerar token JWT

class UserController {
  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      // Verifica se o email já existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      // Cria um hash para a senha
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(400).json({ error: "Credenciais inválidas" });
      }

      // Verifica se a senha está correta
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Credenciais inválidas" });
      }

      // Gera o token JWT
      const token = jwt.sign({ id: user.id }, "secreta_chave_jwt", { expiresIn: "1h" });

      res.json({ message: "Login bem-sucedido", token });
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
