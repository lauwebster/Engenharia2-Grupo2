import User from "../models/UserModel.js";

class UserController {
  static async createUser(req, res) {
    try {
      const { username, email, senha, status } = req.body;

      if (!username || !email || !senha) {
        return res.status(400).json({
          success: false,
          message: "Username, email e senha são obrigatórios",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Formato de email inválido",
        });
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email já cadastrado",
        });
      }

      const userCount = await User.count();
      const permissao = userCount === 0 ? 1 : 0;

      const newUser = await User.create({
        username,
        email,
        senha,
        status: status || 1,
        permissao,
      });

      const userResponse = {
        id: newUser[0].id,
        username: newUser[0].username,
        email: newUser[0].email,
        status: newUser[0].status,
        permissao: newUser[0].permissao,
      };

      res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso",
        user: userResponse,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao criar usuário",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          success: false,
          message: "Email e senha são obrigatórios",
        });
      }

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email ou senha incorretos",
        });
      }

      const isValidPassword = await User.comparaSenha(email, senha);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Email ou senha incorretos",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          permissao: user.permissao,
          status: user.status,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      if (!users || users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nenhum usuário encontrado",
        });
      }
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar usuários",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado",
        });
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar usuário",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await User.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado para atualização",
        });
      }
      res.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso",
        user,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar usuário",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado para exclusão",
        });
      }
      await User.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Usuário excluído com sucesso",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao excluir usuário",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({ message: 'Status inválido' });
      }

      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await user.update({ status });

      return res.json({ message: 'Status atualizado com sucesso' });
    } catch (error) {
      console.error('Error updating user status:', error);
      return res.status(500).json({ message: 'Erro ao atualizar status do usuário' });
    }
  }

  static async updateUserStatus(req, res) {
    try {
      const { status } = req.body;
      
      if (status !== 0 && status !== 1) {
        return res.status(400).json({
          success: false,
          message: "Status inválido. Deve ser 0 (inativo) ou 1 (ativo)",
        });
      }

      const user = await User.updateStatus(req.params.id, status);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado",
        });
      }

      res.status(200).json({
        success: true,
        message: `Usuário ${status === 1 ? 'ativado' : 'desativado'} com sucesso`,
        user,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar status do usuário",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default UserController;
