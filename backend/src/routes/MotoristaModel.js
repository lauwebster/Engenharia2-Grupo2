import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Motorista {
  static async create(data) {
    try {
      const validColumns = [
        'nome',
        'cnh',
        'validade_cnh',
        'telefone',
        'status'
      ];

      const cleanData = Object.fromEntries(
        Object.entries(data)
          .filter(([key]) => validColumns.includes(key))
          .map(([key, value]) => [
            key,
            value === '' ? null : value
          ])
      );

      const validStatus = ['ativo', 'inativo'];
      cleanData.status = (cleanData.status || 'ativo').toLowerCase();

      if (!validStatus.includes(cleanData.status)) {
        throw new Error(`Status inválido. Deve ser um dos seguintes: ${validStatus.join(', ')}`);
      }

      const result = await knex("motorista")
        .insert(cleanData)
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Motorista.create:', error);
      throw error;
    }
  }

  static async findAll() {
    return knex("motorista")
      .select("*")
      .orderBy("nome", "asc");
  }

  static async findById(id) {
    return knex("motorista")
      .where({ id })
      .first();
  }

  static async findByCnh(cnh) {
    return knex("motorista")
      .where({ cnh })
      .first();
  }

  static async update(id, data) {
    return knex("motorista")
      .where({ id })
      .update(data)
      .returning("*");
  }

  static async delete(id) {
    return knex("motorista")
      .where({ id })
      .del();
  }
}

export default Motorista; 