import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Consulta {
  static VALID_STATUS = ['agendada', 'realizada', 'nao_compareceu', 'cancelada'];

  static async create(data) {
    try {
      const validColumns = [
        'paciente_id',
        'instituicao_id',
        'data_consulta',
        'horario',
        'status',
        'observacoes'
      ];

      const cleanData = Object.fromEntries(
        Object.entries(data)
          .filter(([key]) => validColumns.includes(key))
          .map(([key, value]) => [
            key,
            value === '' ? null : value
          ])
      );

      const validStatus = ['agendada', 'realizada', 'cancelada'];
      cleanData.status = (cleanData.status || 'agendada').toLowerCase();

      if (!validStatus.includes(cleanData.status)) {
        throw new Error(`Status inválido. Deve ser um dos seguintes: ${validStatus.join(', ')}`);
      }

      const result = await knex("agendar_consulta")
        .insert(cleanData)
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Consulta.create:', error);
      throw error;
    }
  }

  static async findAll() {
    return knex("agendar_consulta")
      .select("*");
  }

  static async findById(id) {
    return knex("agendar_consulta")
      .where({ id })
      .first();
  }

  static async findByPacienteId(pacienteId) {
    return knex("agendar_consulta as ac")
      .join("instituicoes as i", "ac.instituicao_id", "i.id")
      .select(
        "ac.*",
        "i.nome as instituicao_nome"
      )
      .where("ac.paciente_id", pacienteId);
  }

  static async update(id, data) {
    try {
      const validColumns = [
        'paciente_id',
        'instituicao_id',
        'data_consulta',
        'horario',
        'status',
        'observacoes'
      ];

      const cleanData = Object.fromEntries(
        Object.entries(data)
          .filter(([key]) => validColumns.includes(key))
          .map(([key, value]) => [
            key,
            value === '' ? null : value
          ])
      );

      // Validate status if it's being updated
      if (cleanData.status) {
        cleanData.status = cleanData.status.toLowerCase();
        if (!this.VALID_STATUS.includes(cleanData.status)) {
          throw new Error(`Status inválido. Deve ser um dos seguintes: ${this.VALID_STATUS.join(', ')}`);
        }
      }

      const result = await knex("agendar_consulta")
        .where({ id })
        .update(cleanData)
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Consulta.update:', error);
      throw error;
    }
  }

  static async delete(id) {
    return knex("agendar_consulta")
      .where({ id })
      .del();
  }

  static async findByStatus(status) {
    return knex("agendar_consulta as ac")
      .join("pacientes as p", "ac.paciente_id", "p.id")
      .join("instituicoes as i", "ac.instituicao_id", "i.id")
      .select(
        "ac.*",
        "p.nome as paciente_nome",
        "i.nome as instituicao_nome"
      )
      .where("ac.status", status)
      .orderBy("ac.data_consulta", "asc")
      .orderBy("ac.horario", "asc");
  }
}

export default Consulta; 