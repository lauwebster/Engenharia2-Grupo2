import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class TipoExame {
  static async create(data) {
    const cleanData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === '' ? null : value
      ])
    );

    return knex("tipo_exame")
      .insert(cleanData)
      .returning("*");
  }

  static async findAll() {
    return knex("tipo_exame")
      .select("*");
  }

  static async findById(id) {
    return knex("tipo_exame")
      .where({ id })
      .first();
  }

  static async update(id, data) {
    return knex("tipo_exame")
      .where({ id })
      .update(data)
      .returning("*");
  }

  static async delete(id) {
    return knex("tipo_exame")
      .where({ id })
      .del();
  }
}

export default TipoExame; 