import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Exame {
  static async create(data) {
    try {
      const validColumns = [
        'paciente_id',
        'tipo_exame_id',
        'data_exame',
        'resultado',
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

      const validStatus = ['pendente', 'realizado', 'cancelado'];
      cleanData.status = (cleanData.status || 'pendente').toLowerCase();

      if (!validStatus.includes(cleanData.status)) {
        throw new Error(`Status inválido. Deve ser um dos seguintes: ${validStatus.join(', ')}`);
      }

      console.log(cleanData);

      const result = await knex("exame")
        .insert(cleanData)
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Exame.create:', error);
      throw error;
    }
  }

  static async findAll() {
    return knex("exame")
      .select("*");
  }

  static async findById(id) {
    return knex("exame")
      .where({ id })
      .first();
  }

  static async findByPacienteId(pacienteId) {
    return knex("exame as e")
      .join("tipo_exame as t", "e.tipo_exame_id", "t.id")
      .select(
        "e.*",
        "t.nome as tipo"
      )
      .where("e.paciente_id", pacienteId)
      .orderBy("e.data_exame", "desc");
  }

  static async update(id, data) {
    return knex("exame")
      .where({ id })
      .update(data)
      .returning("*");
  }

  static async delete(id) {
    return knex("exame")
      .where({ id })
      .del();
  }

  static async updateBatchStatus(ids, status) {
    try {
      const validStatus = ['pendente', 'realizado', 'cancelado', 'retirado'];
      if (!validStatus.includes(status)) {
        throw new Error(`Status inválido. Deve ser um dos seguintes: ${validStatus.join(', ')}`);
      }

      const result = await knex("exame")
        .whereIn("id", ids)
        .update({ status })
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Exame.updateBatchStatus:', error);
      throw error;
    }
  }
}

export default Exame; 