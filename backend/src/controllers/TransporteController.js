import Transporte from "../models/TransporteModel.js";

class TransporteController {
  static async createTransporte(req, res) {
    try {
      const { motorista_id, veiculo_id, data_transporte, horario_saida, horario_retorno, status, pacientes } = req.body;

      if (!motorista_id || !veiculo_id || !data_transporte || !horario_saida) {
        return res.status(400).json({
          success: false,
          message: "Motorista, veículo, data e horário de saída são obrigatórios",
        });
      }

      const newTransporte = await Transporte.createWithPacientes({
        transporte: {
          motorista_id,
          veiculo_id,
          data_transporte,
          horario_saida,
          horario_retorno,
          status: status || 'agendado',
        },
        pacientes: pacientes || []
      });

      res.status(201).json({
        success: true,
        message: "Transporte criado com sucesso",
        transporte: newTransporte,
      });
    } catch (error) {
      console.error("Error creating transporte:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao criar transporte",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getAllTransportes(req, res) {
    try {
      const transportes = await Transporte.findAll();
      res.status(200).json({
        success: true,
        transportes,
      });
    } catch (error) {
      console.error("Error fetching transportes:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar transportes",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getTransporteById(req, res) {
    try {
      const transporte = await Transporte.findById(req.params.id);
      if (!transporte) {
        return res.status(404).json({
          success: false,
          message: "Transporte não encontrado",
        });
      }
      res.status(200).json({
        success: true,
        transporte,
      });
    } catch (error) {
      console.error("Error fetching transporte:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar transporte",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updateTransporte(req, res) {
    try {
      const { motorista_id, veiculo_id, data_transporte, horario_saida, horario_retorno, status } = req.body;

      const transporte = await Transporte.update(req.params.id, {
        motorista_id,
        veiculo_id,
        data_transporte,
        horario_saida,
        horario_retorno,
        status,
      });

      if (!transporte) {
        return res.status(404).json({
          success: false,
          message: "Transporte não encontrado para atualização",
        });
      }

      res.status(200).json({
        success: true,
        message: "Transporte atualizado com sucesso",
        transporte,
      });
    } catch (error) {
      console.error("Error updating transporte:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar transporte",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async deleteTransporte(req, res) {
    try {
      const transporte = await Transporte.findById(req.params.id);
      if (!transporte) {
        return res.status(404).json({
          success: false,
          message: "Transporte não encontrado para exclusão",
        });
      }

      await Transporte.delete(req.params.id);
      
      res.status(200).json({
        success: true,
        message: "Transporte excluído com sucesso",
      });
    } catch (error) {
      console.error("Error deleting transporte:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao excluir transporte",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default TransporteController; 