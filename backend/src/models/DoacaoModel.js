import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Doacao {
  static async create(data) {
    try {
      const validColumns = [
        'paciente_id',
        'data_doacao',
        'valor',
        'observacoes',
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

      const validStatus = ['pendente', 'confirmada', 'cancelada', 'repassado'];
      cleanData.status = (cleanData.status || 'pendente').toLowerCase();

      if (!validStatus.includes(cleanData.status)) {
        throw new Error(`Status inválido. Deve ser um dos seguintes: ${validStatus.join(', ')}`);
      }

      const result = await knex("doacao")
        .insert(cleanData)
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Doacao.create:', error);
      throw error;
    }
  }

  static async findAll() {
    return knex("doacao")
      .select("*");
  }

  static async findById(id) {
    return knex("doacao")
      .where({ id })
      .first();
  }

  static async findByPacienteId(pacienteId) {
    return knex("doacao")
      .select("*")
      .where("paciente_id", pacienteId);
  }

  static async update(id, data) {
    return knex("doacao")
      .where({ id })
      .update(data)
      .returning("*");
  }

  static async delete(id) {
    return knex("doacao")
      .where({ id })
      .del();
  }

  static async findByStatus(status) {
    return knex("doacao")
      .select("*")
      .where({ status })
      .orderBy("data_doacao", "asc");
  }
}

export default Doacao; 