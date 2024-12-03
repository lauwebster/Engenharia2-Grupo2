import Motorista from "../models/MotoristaModel.js";

class MotoristaController {
  static async createMotorista(req, res) {
    try {
      const { nome, cnh, validade_cnh, telefone, status } = req.body;

      if (!nome || !cnh || !validade_cnh) {
        return res.status(400).json({
          success: false,
          message: "Nome, CNH e data de validade da CNH são obrigatórios",
        });
      }

      const cnhRegex = /^\d{11}$/;
      if (!cnhRegex.test(cnh)) {
        return res.status(400).json({
          success: false,
          message: "CNH inválida - deve conter 11 dígitos",
        });
      }

      const existingMotorista = await Motorista.findByCnh(cnh);
      if (existingMotorista) {
        return res.status(400).json({
          success: false,
          message: "CNH já cadastrada",
        });
      }

      const newMotorista = await Motorista.create({
        nome,
        cnh,
        validade_cnh,
        telefone,
        status: status || 'ativo',
      });

      res.status(201).json({
        success: true,
        message: "Motorista criado com sucesso",
        motorista: newMotorista[0],
      });
    } catch (error) {
      console.error("Error creating motorista:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao criar motorista",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getAllMotoristas(req, res) {
    try {
      const motoristas = await Motorista.findAll();
      res.status(200).json({
        success: true,
        motoristas,
      });
    } catch (error) {
      console.error("Error fetching motoristas:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar motoristas",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getMotoristaById(req, res) {
    try {
      const motorista = await Motorista.findById(req.params.id);
      if (!motorista) {
        return res.status(404).json({
          success: false,
          message: "Motorista não encontrado",
        });
      }
      res.status(200).json({
        success: true,
        motorista,
      });
    } catch (error) {
      console.error("Error fetching motorista:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar motorista",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updateMotorista(req, res) {
    try {
      const { nome, cnh, telefone, status } = req.body;

      if (cnh) {
        const cnhRegex = /^\d{11}$/;
        if (!cnhRegex.test(cnh)) {
          return res.status(400).json({
            success: false,
            message: "CNH inválida - deve conter 11 dígitos",
          });
        }

        const existingMotorista = await Motorista.findByCnh(cnh);
        if (existingMotorista && existingMotorista.id !== parseInt(req.params.id)) {
          return res.status(400).json({
            success: false,
            message: "CNH já cadastrada para outro motorista",
          });
        }
      }

      const motorista = await Motorista.update(req.params.id, {
        nome,
        cnh,
        telefone,
        status,
      });

      if (!motorista) {
        return res.status(404).json({
          success: false,
          message: "Motorista não encontrado para atualização",
        });
      }

      res.status(200).json({
        success: true,
        message: "Motorista atualizado com sucesso",
        motorista,
      });
    } catch (error) {
      console.error("Error updating motorista:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar motorista",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async deleteMotorista(req, res) {
    try {
      const motorista = await Motorista.findById(req.params.id);
      if (!motorista) {
        return res.status(404).json({
          success: false,
          message: "Motorista não encontrado para exclusão",
        });
      }

      await Motorista.delete(req.params.id);
      
      res.status(200).json({
        success: true,
        message: "Motorista excluído com sucesso",
      });
    } catch (error) {
      console.error("Error deleting motorista:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao excluir motorista",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default MotoristaController; 