import Doacao from '../models/DoacaoModel.js';

class DoacaoController {
  // Criar uma nova doação
  static async createDoacao(req, res) {
    try {
      const { paciente_id, data_doacao, valor, observacoes, status } = req.body;

      // Validações básicas
      if (!paciente_id || !data_doacao || valor === undefined) {
        return res.status(400).json({
          success: false,
          message: 'paciente_id, data_doacao e valor são obrigatórios',
        });
      }

      if (isNaN(valor) || Number(valor) < 0) {
        return res.status(400).json({
          success: false,
          message: 'O valor deve ser um número não negativo',
        });
      }

      const validStatus = ['pendente', 'confirmada', 'cancelada', 'repassado'];
      if (status && !validStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Status inválido. Deve ser um dos seguintes: ${validStatus.join(', ')}`,
        });
      }

      const novaDoacao = await Doacao.create({
        paciente_id,
        data_doacao,
        valor,
        observacoes,
        status,
      });

      res.status(201).json({
        success: true,
        message: 'Doação criada com sucesso',
        doacao: novaDoacao[0],
      });
    } catch (error) {
      console.error('Erro ao criar doação:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar doação',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  // Obter todas as doações
  static async getAllDoacoes(req, res) {
    try {
      const doacoes = await Doacao.findAll();
      res.status(200).json({
        success: true,
        doacoes,
      });
    } catch (error) {
      console.error('Erro ao buscar doações:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar doações',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  // Obter uma doação por ID
  static async getDoacaoById(req, res) {
    try {
      const { id } = req.params;
      const doacao = await Doacao.findById(id);

      if (!doacao) {
        return res.status(404).json({
          success: false,
          message: 'Doação não encontrada',
        });
      }

      res.status(200).json({
        success: true,
        doacao,
      });
    } catch (error) {
      console.error('Erro ao buscar doação por ID:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar doação',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  // Atualizar uma doação existente
  static async updateDoacao(req, res) {
    try {
      const { id } = req.params;
      const { paciente_id, data_doacao, valor, observacoes, status } = req.body;

      // Verifica se a doação existe
      const doacaoExistente = await Doacao.findById(id);
      if (!doacaoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Doação não encontrada para atualização',
        });
      }

      // Validações
      if (valor !== undefined && (isNaN(valor) || Number(valor) < 0)) {
        return res.status(400).json({
          success: false,
          message: 'O valor deve ser um número não negativo',
        });
      }

      const validStatus = ['pendente', 'confirmada', 'cancelada', 'repassado'];
      if (status && !validStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Status inválido. Deve ser um dos seguintes: ${validStatus.join(', ')}`,
        });
      }

      const doacaoAtualizada = await Doacao.update(id, {
        paciente_id,
        data_doacao,
        valor,
        observacoes,
        status,
      });

      res.status(200).json({
        success: true,
        message: 'Doação atualizada com sucesso',
        doacao: doacaoAtualizada[0],
      });
    } catch (error) {
      console.error('Erro ao atualizar doação:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar doação',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  // Deletar uma doação
  static async deleteDoacao(req, res) {
    try {
      const { id } = req.params;
      const doacaoExistente = await Doacao.findById(id);

      if (!doacaoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Doação não encontrada para exclusão',
        });
      }

      await Doacao.delete(id);

      res.status(200).json({
        success: true,
        message: 'Doação excluída com sucesso',
      });
    } catch (error) {
      console.error('Erro ao excluir doação:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir doação',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
}

export default DoacaoController; 