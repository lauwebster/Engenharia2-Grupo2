import Caixa from "../models/CaixaModel.js";

class CaixaController {
  static async createCaixa(req, res) {
    try {
      const { responsavel_id } = req.body;

      if (!responsavel_id) {
        return res.status(400).json({
          success: false,
          message: "Responsável é obrigatório",
        });
      }

      const caixaAberto = await Caixa.findOpenCaixa();
      if (caixaAberto) {
        return res.status(400).json({
          success: false,
          message: "Já existe um caixa aberto. Feche o caixa atual antes de abrir um novo.",
        });
      }

      const lastClosedCaixa = await Caixa.findLastClosed();
      const saldo_inicial = lastClosedCaixa ? lastClosedCaixa.saldo_final : 0;

      const now = new Date();
      const newCaixa = await Caixa.create({
        data_abertura: now.toISOString().split('T')[0],
        hora_abertura: now.toTimeString().split(' ')[0],
        saldo_inicial,
        status: 'aberto',
        responsavel_id,
      });

      res.status(201).json({
        success: true,
        message: "Caixa aberto com sucesso",
        caixa: newCaixa[0],
      });
    } catch (error) {
      console.error("Error creating caixa:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao abrir caixa",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getAllCaixas(req, res) {
    try {
      const caixas = await Caixa.findAll();
      res.status(200).json({
        success: true,
        caixas,
      });
    } catch (error) {
      console.error("Error fetching caixas:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar caixas",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getCaixaById(req, res) {
    try {
      const caixa = await Caixa.findById(req.params.id);
      if (!caixa) {
        return res.status(404).json({
          success: false,
          message: "Caixa não encontrado",
        });
      }

      const movimentos = await Caixa.getMovimentos(caixa.id);
      const saldo_atual = await Caixa.getSaldoAtual(caixa.id);

      res.status(200).json({
        success: true,
        caixa: {
          ...caixa,
          movimentos,
          saldo_atual
        },
      });
    } catch (error) {
      console.error("Error fetching caixa:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar caixa",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async addMovimento(req, res) {
    try {
      const { tipo_movimento, valor, descricao, responsavel_id } = req.body;

      const caixaAberto = await Caixa.findOpenCaixa();
      if (!caixaAberto) {
        return res.status(400).json({
          success: false,
          message: "Não há caixa aberto para registrar movimento",
        });
      }

      if (!tipo_movimento || valor === undefined || !responsavel_id) {
        return res.status(400).json({
          success: false,
          message: "Tipo de movimento, valor e responsável são obrigatórios",
        });
      }

      const saldo_atual = await Caixa.getSaldoAtual(caixaAberto.id);

      if (tipo_movimento === 'saida' && saldo_atual < valor) {
        return res.status(400).json({
          success: false,
          message: "Saldo insuficiente para realizar esta operação",
        });
      }

      const movimento = await Caixa.addMovimento({
        caixa_id: caixaAberto.id,
        tipo_movimento,
        valor,
        descricao,
        responsavel_id
      });

      const novo_saldo = await Caixa.getSaldoAtual(caixaAberto.id);

      res.status(201).json({
        success: true,
        message: "Movimento registrado com sucesso",
        movimento: movimento[0],
        saldo_atual: novo_saldo
      });
    } catch (error) {
      console.error("Error adding movimento:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao registrar movimento",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async closeCaixa(req, res) {
    try {
      const { responsavel_id } = req.body;

      if (!responsavel_id) {
        return res.status(400).json({
          success: false,
          message: "Responsável é obrigatório",
        });
      }

      const caixaAberto = await Caixa.findOpenCaixa();
      if (!caixaAberto) {
        return res.status(404).json({
          success: false,
          message: "Não há caixa aberto para fechar",
        });
      }

      const saldo_final = await Caixa.getSaldoAtual(caixaAberto.id);
      const now = new Date();

      const caixaFechado = await Caixa.update(caixaAberto.id, {
        status: 'fechado',
        data_fechamento: now.toISOString().split('T')[0],
        hora_fechamento: now.toTimeString().split(' ')[0],
        saldo_final,
        responsavel_fechamento_id: responsavel_id
      });

      res.status(200).json({
        success: true,
        message: "Caixa fechado com sucesso",
        caixa: caixaFechado[0],
        saldo_final: saldo_final
      });
    } catch (error) {
      console.error("Error closing caixa:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao fechar caixa",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getCaixaStatus(req, res) {
    try {
      const caixaAberto = await Caixa.findOpenCaixa();
      
      if (!caixaAberto) {
        return res.status(200).json({
          success: true,
          aberto: false
        });
      }

      const saldo_atual = await Caixa.getSaldoAtual(caixaAberto.id);

      res.status(200).json({
        success: true,
        aberto: true,
        id: caixaAberto.id,
        saldo_atual,
        data_abertura: caixaAberto.data_abertura,
        hora_abertura: caixaAberto.hora_abertura
      });
    } catch (error) {
      console.error("Error getting caixa status:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar status do caixa",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default CaixaController; 