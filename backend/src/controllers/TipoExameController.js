import TipoExame from "../models/TipoExameModel.js";

class TipoExameController {
  static async createTipoExame(req, res) {
    try {
      const { nome, descricao, valor } = req.body;

      if (!nome) {
        return res.status(400).json({
          success: false,
          message: "Nome do tipo de exame é obrigatório",
        });
      }
      const newTipoExame = await TipoExame.create({
        nome,
        descricao,
        valor,
      });

      res.status(201).json({
        success: true,
        message: "Tipo de exame criado com sucesso",
        tipoExame: newTipoExame[0],
      });
    } catch (error) {
      console.error("Error creating tipo exame:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao criar tipo de exame",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getAllTiposExame(req, res) {
    try {
      const tiposExame = await TipoExame.findAll();
      res.status(200).json({
        success: true,
        tiposExame,
      });
    } catch (error) {
      console.error("Error fetching tipos exame:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar tipos de exame",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getTipoExameById(req, res) {
    try {
      const tipoExame = await TipoExame.findById(req.params.id);
      if (!tipoExame) {
        return res.status(404).json({
          success: false,
          message: "Tipo de exame não encontrado",
        });
      }
      res.status(200).json({
        success: true,
        tipoExame,
      });
    } catch (error) {
      console.error("Error fetching tipo exame:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar tipo de exame",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updateTipoExame(req, res) {
    try {
      const { nome, descricao, valor_referencia } = req.body;
      
      const tipoExame = await TipoExame.findById(req.params.id);
      if (!tipoExame) {
        return res.status(404).json({
          success: false,
          message: "Tipo de exame não encontrado",
        });
      }

      const updatedTipoExame = await TipoExame.update(req.params.id, {
        nome,
        descricao,
        valor_referencia,
      });

      res.status(200).json({
        success: true,
        message: "Tipo de exame atualizado com sucesso",
        tipoExame: updatedTipoExame[0],
      });
    } catch (error) {
      console.error("Error updating tipo exame:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar tipo de exame",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async deleteTipoExame(req, res) {
    try {
      const tipoExame = await TipoExame.findById(req.params.id);
      if (!tipoExame) {
        return res.status(404).json({
          success: false,
          message: "Tipo de exame não encontrado",
        });
      }

      await TipoExame.delete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Tipo de exame deletado com sucesso",
      });
    } catch (error) {
      console.error("Error deleting tipo exame:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao deletar tipo de exame",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default TipoExameController; 