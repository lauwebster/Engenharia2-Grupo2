import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Instituicoes {
  static async create(data) {
    const cleanData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === '' ? null : value
      ])
    );

    return knex("instituicoes")
      .insert(cleanData)
      .returning("*");
  }

  static async findAll() {
    return knex("instituicoes")
      .select("*");
  }

  static async findById(id) {
    return knex("instituicoes")
      .where({ id })
      .first();
  }

  static async update(id, data) {
    return knex("instituicoes")
      .where({ id })
      .update(data)
      .returning("*");
  }

  static async delete(id) {
    return knex("instituicoes")
      .where({ id })
      .del();
  }
}

export default Instituicoes; 