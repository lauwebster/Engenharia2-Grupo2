import Setor from "../models/SetorModel.js";
import Doacao from "../models/DoacaoModel.js";

class SetorController {
  static async createSetor(req, res) {
    try {
      const { nome, descricao, responsavel_id, status } = req.body;

      if (!nome) {
        return res.status(400).json({
          success: false,
          message: "Nome do setor é obrigatório",
        });
      }

      const setor = await Setor.create({
        nome,
        descricao,
        responsavel_id,
        status: status || 'ativo',
        saldo: 0,
      });

      res.status(201).json({
        success: true,
        message: "Setor criado com sucesso",
        setor: setor[0],
      });
    } catch (error) {
      console.error("Error creating setor:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao criar setor",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getAllSetores(req, res) {
    try {
      const setores = await Setor.findAll();
      res.status(200).json({
        success: true,
        setores,
      });
    } catch (error) {
      console.error("Error fetching setores:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar setores",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async createRepasse(req, res) {
    try {
      const { setor_id, valor, observacoes, responsavel_id } = req.body;

      if (!setor_id || !responsavel_id) {
        return res.status(400).json({
          success: false,
          message: "Setor e responsável são obrigatórios",
        });
      }

      // Get confirmed donations that haven't been transferred yet
      const doacoesConfirmadas = await Doacao.findByStatus('confirmada');
      
      if (doacoesConfirmadas.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Não há doações confirmadas disponíveis para repasse",
        });
      }

      const totalDoacoes = doacoesConfirmadas.reduce((sum, doacao) => 
        sum + parseFloat(doacao.valor), 0
      );

      // Create repasse and update donations status
      const repasse = await Setor.createRepasse({
        setor_id,
        valor: totalDoacoes,
        data_repasse: new Date(),
        responsavel_id,
        observacoes: observacoes || `Repasse automático de ${doacoesConfirmadas.length} doações`,
      });

      // Update all used donations to 'repassado' status
      await Promise.all(
        doacoesConfirmadas.map(doacao => 
          Doacao.update(doacao.id, { status: 'repassado' })
        )
      );

      res.status(201).json({
        success: true,
        message: "Repasse realizado com sucesso",
        repasse,
        doacoes_processadas: doacoesConfirmadas.length,
        valor_total: totalDoacoes
      });
    } catch (error) {
      console.error("Error creating repasse:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao realizar repasse",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getRepasses(req, res) {
    try {
      const { setor_id } = req.query;
      const repasses = await Setor.getRepasses(setor_id);
      res.status(200).json({
        success: true,
        repasses,
      });
    } catch (error) {
      console.error("Error fetching repasses:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar repasses",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

export default SetorController; 