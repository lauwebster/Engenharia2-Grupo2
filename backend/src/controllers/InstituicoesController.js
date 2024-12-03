import Instituicoes from "../models/InstituicoesModel.js";

class InstituicoesController {
  static async createInstituicao(req, res) {
    try {
      const { nome, endereco, telefone, especialidade } = req.body;

      if (!nome) {
        return res.status(400).json({
          success: false,
          message: "Nome da instituição é obrigatório",
        });
      }

      const newInstituicao = await Instituicoes.create({
        nome,
        endereco,
        telefone,
        especialidade
      });

      res.status(201).json({
        success: true,
        message: "Instituição criada com sucesso",
        instituicao: newInstituicao[0],
      });
    } catch (error) {
      console.error("Error creating instituicao:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao criar instituição",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getAllInstituicoes(req, res) {
    try {
      const instituicoes = await Instituicoes.findAll();
      res.status(200).json({
        success: true,
        instituicoes,
      });
    } catch (error) {
      console.error("Error fetching instituicoes:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar instituições",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getInstituicaoById(req, res) {
    try {
      const instituicao = await Instituicoes.findById(req.params.id);
      if (!instituicao) {
        return res.status(404).json({
          success: false,
          message: "Instituição não encontrada",
        });
      }
      res.status(200).json({
        success: true,
        instituicao,
      });
    } catch (error) {
      console.error("Error fetching instituicao:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar instituição",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updateInstituicao(req, res) {
    try {
      const { nome, endereco, telefone, especialidade } = req.body;
      
      if (!nome) {
        return res.status(400).json({
          success: false,
          message: "Nome da instituição é obrigatório",
        });
      }

      const instituicao = await Instituicoes.update(req.params.id, {
        nome,
        endereco,
        telefone,
        especialidade
      });

      if (!instituicao || instituicao.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Instituição não encontrada para atualização",
        });
      }

      res.status(200).json({
        success: true,
        message: "Instituição atualizada com sucesso",
        instituicao: instituicao[0],
      });
    } catch (error) {
      console.error("Error updating instituicao:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar instituição",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async deleteInstituicao(req, res) {
    try {
      const result = await Instituicoes.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Instituição não encontrada para exclusão",
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Instituição excluída com sucesso",
      });
    } catch (error) {
      console.error("Error deleting instituicao:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao excluir instituição",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default InstituicoesController; 