import Exame from "../models/ExameModel.js";

class ExameController {
  static async createExame(req, res) {
    try {
      const examData = {
        ...req.body,
        status: 'pendente',
        paciente_id: req.body.paciente_id,
        tipo_exame_id: req.body.tipo_exame_id,
        data_exame: req.body.data_exame,
        resultado: req.body.resultado || null
      };

      const newExam = await Exame.create(examData);

      res.status(201).json({
        success: true,
        message: "Exame criado com sucesso",
        exame: newExam[0]
      });
    } catch (error) {
      console.error("Error creating exame:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Erro ao criar exame"
      });
    }
  }

  static async getAllExames(req, res) {
    try {
      const exames = await Exame.findAll();
      res.status(200).json({
        success: true,
        exames,
      });
    } catch (error) {
      console.error("Error fetching exames:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar exames",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getExameById(req, res) {
    try {
      const exame = await Exame.findById(req.params.id);
      if (!exame) {
        return res.status(404).json({
          success: false,
          message: "Exame não encontrado",
        });
      }
      res.status(200).json({
        success: true,
        exame,
      });
    } catch (error) {
      console.error("Error fetching exame:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar exame",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getExamesByPacienteId(req, res) {
    try {
      const { pacienteId } = req.params;
      const exames = await Exame.findByPacienteId(pacienteId);
      
      res.status(200).json({
        success: true,
        exames,
      });
    } catch (error) {
      console.error("Error fetching patient exams:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar exames do paciente",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updateExame(req, res) {
    try {
      const { tipo_exame_id, data_exame, resultado, status } = req.body;
      
      const exame = await Exame.update(req.params.id, {
        tipo_exame_id,
        data_exame,
        resultado,
        status
      });

      if (!exame) {
        return res.status(404).json({
          success: false,
          message: "Exame não encontrado para atualização",
        });
      }

      res.status(200).json({
        success: true,
        message: "Exame atualizado com sucesso",
        exame: exame[0],
      });
    } catch (error) {
      console.error("Error updating exame:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar exame",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async deleteExame(req, res) {
    try {
      const result = await Exame.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Exame não encontrado para exclusão",
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Exame excluído com sucesso",
      });
    } catch (error) {
      console.error("Error deleting exame:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao excluir exame",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updateBatchStatus(req, res) {
    try {
      const { ids, status } = req.body;
      
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          success: false,
          message: "IDs dos exames são obrigatórios"
        });
      }

      const updatedExams = await Exame.updateBatchStatus(ids, status);

      res.status(200).json({
        success: true,
        message: "Status dos exames atualizados com sucesso",
        exames: updatedExams
      });
    } catch (error) {
      console.error("Error updating exams status:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Erro ao atualizar status dos exames",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default ExameController; 