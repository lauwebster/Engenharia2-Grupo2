import Parametrizacao from "../models/ParametrizacaoModel.js";

class ParametrizacaoController {
  static async createParametrizacao(req, res) {
    try {
      const { nome, sigla, endereco, telefone, email, logo_url, descricao } =
        req.body;

      if (!nome || !sigla || !endereco || !email) {
        return res.status(400).json({
          success: false,
          message: "Nome, sigla, endereço e email são obrigatórios",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Formato de email inválido",
        });
      }

      const parametrizacao = await Parametrizacao.create({
        nome,
        sigla,
        endereco,
        telefone,
        email,
        logo_url,
        descricao,
      });

      res.status(201).json({
        success: true,
        message: "Parametrização criada com sucesso",
        parametrizacao: parametrizacao[0],
      });
    } catch (error) {
      console.error("Erro ao criar parametrização:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao criar parametrização",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getAllParametrizacoes(req, res) {
    try {
      const parametrizacoes = await Parametrizacao.findAll();
      res.status(200).json({
        success: true,
        parametrizacoes: parametrizacoes || [],
      });
    } catch (error) {
      console.error("Erro ao buscar parametrizações:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar parametrizações",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getParametrizacaoById(req, res) {
    try {
      const { id } = req.params;
      const parametrizacao = await Parametrizacao.findById(id);

      if (!parametrizacao) {
        return res.status(404).json({
          success: false,
          message: "Parametrização não encontrada",
        });
      }

      res.status(200).json({
        success: true,
        parametrizacao,
      });
    } catch (error) {
      console.error("Erro ao buscar parametrização:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar parametrização",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updateParametrizacao(req, res) {
    try {
      const { id } = req.params;
      const { nome, sigla, endereco, telefone, email, logo_url, descricao } =
        req.body;

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            message: "Formato de email inválido",
          });
        }
      }

      const parametrizacao = await Parametrizacao.update(id, {
        nome,
        sigla,
        endereco,
        telefone,
        email,
        logo_url,
        descricao,
      });

      if (!parametrizacao || parametrizacao.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Parametrização não encontrada",
        });
      }

      res.status(200).json({
        success: true,
        message: "Parametrização atualizada com sucesso",
        parametrizacao: parametrizacao[0],
      });
    } catch (error) {
      console.error("Erro ao atualizar parametrização:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar parametrização",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async deleteParametrizacao(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Parametrizacao.delete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Parametrização não encontrada",
        });
      }

      res.status(200).json({
        success: true,
        message: "Parametrização excluída com sucesso",
      });
    } catch (error) {
      console.error("Erro ao excluir parametrização:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao excluir parametrização",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default ParametrizacaoController;
