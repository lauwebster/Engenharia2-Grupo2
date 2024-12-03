import Veiculos from "../models/VeiculoModel.js";

class VeiculosController {
  static async createVeiculo(req, res) {
    try {
      const { placa, modelo, ano, capacidade, status } = req.body;

      if (!placa || !modelo) {
        return res.status(400).json({
          success: false,
          message: "Placa e modelo são obrigatórios",
        });
      }

      const placaRegex = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/;
      if (!placaRegex.test(placa)) {
        return res.status(400).json({
          success: false,
          message: "Formato de placa inválido",
        });
      }

      const existingVeiculo = await Veiculos.findByPlaca(placa);
      if (existingVeiculo) {
        return res.status(400).json({
          success: false,
          message: "Placa já cadastrada",
        });
      }

      const newVeiculo = await Veiculos.create({
        placa,
        modelo,
        ano,
        capacidade,
        status: status || 'disponivel',
      });

      res.status(201).json({
        success: true,
        message: "Veículo criado com sucesso",
        veiculo: newVeiculo[0],
      });
    } catch (error) {
      console.error("Error creating veiculo:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao criar veículo",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getAllVeiculos(req, res) {
    try {
      const veiculos = await Veiculos.findAll();
      res.status(200).json({
        success: true,
        veiculos,
      });
    } catch (error) {
      console.error("Error fetching veiculos:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar veículos",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getVeiculoById(req, res) {
    try {
      const veiculo = await Veiculos.findById(req.params.id);
      if (!veiculo) {
        return res.status(404).json({
          success: false,
          message: "Veículo não encontrado",
        });
      }
      res.status(200).json({
        success: true,
        veiculo,
      });
    } catch (error) {
      console.error("Error fetching veiculo:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar veículo",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updateVeiculo(req, res) {
    try {
      const { placa, modelo, ano, capacidade, status } = req.body;

      if (placa) {
        const placaRegex = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/;
        if (!placaRegex.test(placa)) {
          return res.status(400).json({
            success: false,
            message: "Formato de placa inválido",
          });
        }

        const existingVeiculo = await Veiculos.findByPlaca(placa);
        if (existingVeiculo && existingVeiculo.id !== parseInt(req.params.id)) {
          return res.status(400).json({
            success: false,
            message: "Placa já cadastrada para outro veículo",
          });
        }
      }

      const veiculo = await Veiculos.update(req.params.id, {
        placa,
        modelo,
        ano,
        capacidade,
        status,
      });

      if (!veiculo) {
        return res.status(404).json({
          success: false,
          message: "Veículo não encontrado para atualização",
        });
      }

      res.status(200).json({
        success: true,
        message: "Veículo atualizado com sucesso",
        veiculo,
      });
    } catch (error) {
      console.error("Error updating veiculo:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar veículo",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async deleteVeiculo(req, res) {
    try {
      const veiculo = await Veiculos.findById(req.params.id);
      if (!veiculo) {
        return res.status(404).json({
          success: false,
          message: "Veículo não encontrado para exclusão",
        });
      }

      await Veiculos.delete(req.params.id);
      
      res.status(200).json({
        success: true,
        message: "Veículo excluído com sucesso",
      });
    } catch (error) {
      console.error("Error deleting veiculo:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao excluir veículo",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default VeiculosController; 