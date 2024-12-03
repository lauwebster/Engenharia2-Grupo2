import Despesa from '../models/DespesaModel.js';

class DespesaController {
  static async createDespesa(req, res) {
    try {
      const { descricao, data_despesa, valor, tipo, status } = req.body;

      if (!descricao || !data_despesa || valor === undefined || !tipo) {
        return res.status(400).json({
          success: false,
          message: 'descricao, data_despesa, tipo e valor são obrigatórios',
        });
      }

      if (isNaN(valor) || Number(valor) < 0) {
        return res.status(400).json({
          success: false,
          message: 'O valor deve ser um número não negativo',
        });
      }

      const novaDespesa = await Despesa.create({
        descricao,
        data_despesa,
        valor,
        tipo,
        status: status || 'pendente',
      });

      res.status(201).json({
        success: true,
        message: 'Despesa criada com sucesso',
        despesa: novaDespesa[0],
      });
    } catch (error) {
      console.error('Erro ao criar despesa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar despesa',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  static async getAllDespesas(req, res) {
    try {
      const despesas = await Despesa.findAll();
      res.status(200).json({
        success: true,
        despesas,
      });
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar despesas',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  static async getDespesaById(req, res) {
    try {
      const { id } = req.params;
      const despesa = await Despesa.findById(id);
      
      if (!despesa) {
        return res.status(404).json({
          success: false,
          message: 'Despesa não encontrada',
        });
      }

      res.status(200).json({
        success: true,
        despesa,
      });
    } catch (error) {
      console.error('Erro ao buscar despesa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar despesa',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  static async deleteDespesa(req, res) {
    const { id } = req.params;
    await Despesa.delete(id);
    res.status(200).json({ success: true, message: 'Despesa deletada com sucesso' });
  }

  static async updateDespesaStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, caixa_id } = req.body;

      const validStatus = ['pendente', 'paga', 'cancelada'];
      if (!validStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Status inválido. Deve ser um dos seguintes: ${validStatus.join(', ')}`,
        });
      }

      const updateData = { status };
      if (status === 'paga' && caixa_id) {
        updateData.caixa_id = caixa_id;
      }

      const despesa = await Despesa.update(id, updateData);
      
      if (!despesa || despesa.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Despesa não encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Status da despesa atualizado com sucesso',
        despesa: despesa[0],
      });
    } catch (error) {
      console.error('Erro ao atualizar status da despesa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar status da despesa',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  static async updateDespesa(req, res) {
    try {
      const { id } = req.params;
      const { descricao, data_despesa, valor, tipo, status, caixa_id } = req.body;

      if (!descricao || !data_despesa || valor === undefined || !tipo) {
        return res.status(400).json({
          success: false,
          message: 'descricao, data_despesa, tipo e valor são obrigatórios',
        });
      }

      if (isNaN(valor) || Number(valor) < 0) {
        return res.status(400).json({
          success: false,
          message: 'O valor deve ser um número não negativo',
        });
      }

      const despesa = await Despesa.update(id, {
        descricao,
        data_despesa,
        valor,
        tipo,
        status: status || 'pendente',
        caixa_id: caixa_id || null
      });

      if (!despesa || despesa.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Despesa não encontrada',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Despesa atualizada com sucesso',
        despesa: despesa[0],
      });
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar despesa',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
}

export default DespesaController; 