import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Caixa {
  static async create(data) {
    try {
      const validColumns = [
        'data_abertura',
        'hora_abertura',
        'saldo_inicial',
        'status',
        'responsavel_id'
      ];

      const cleanData = Object.fromEntries(
        Object.entries(data)
          .filter(([key]) => validColumns.includes(key))
          .map(([key, value]) => [
            key,
            value === '' ? null : value
          ])
      );

      const result = await knex("caixa")
        .insert(cleanData)
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Caixa.create:', error);
      throw error;
    }
  }

  static async findAll() {
    return knex("caixa")
      .select("*")
      .orderBy("data_abertura", "desc");
  }

  static async findById(id) {
    return knex("caixa")
      .where({ id })
      .first();
  }

  static async findOpenCaixa() {
    return knex("caixa")
      .where({ status: 'aberto' })
      .first();
  }

  static async update(id, data) {
    return knex("caixa")
      .where({ id })
      .update(data)
      .returning("*");
  }

  static async addMovimento(data) {
    try {
      const validColumns = [
        'caixa_id',
        'tipo_movimento',
        'valor',
        'descricao',
        'responsavel_id'
      ];

      const cleanData = Object.fromEntries(
        Object.entries(data)
          .filter(([key]) => validColumns.includes(key))
          .map(([key, value]) => [
            key,
            value === '' ? null : value
          ])
      );

      const validTipos = ['entrada', 'saida'];
      if (!validTipos.includes(cleanData.tipo_movimento)) {
        throw new Error(`Tipo de movimento inválido. Deve ser: ${validTipos.join(' ou ')}`);
      }

      const result = await knex("movimento_caixa")
        .insert(cleanData)
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Caixa.addMovimento:', error);
      throw error;
    }
  }

  static async getMovimentos(caixaId) {
    return knex("movimento_caixa")
      .where({ caixa_id: caixaId })
      .orderBy("created_at", "desc");
  }

  static async getSaldoAtual(caixaId) {
    const caixa = await this.findById(caixaId);
    if (!caixa) return 0;

    const movimentos = await knex("movimento_caixa")
      .where({ caixa_id: caixaId })
      .select("tipo_movimento", "valor");

    let saldo = parseFloat(caixa.saldo_inicial) || 0;

    movimentos.forEach(mov => {
      const valor = parseFloat(mov.valor);
      if (mov.tipo_movimento === 'entrada') {
        saldo += valor;
      } else {
        saldo -= valor;
      }
    });

    return saldo;
  }

  static async findLastClosed() {
    return knex("caixa")
      .where({ status: 'fechado' })
      .orderBy('data_fechamento', 'desc')
      .orderBy('hora_fechamento', 'desc')
      .first();
  }
}

export default Caixa; 