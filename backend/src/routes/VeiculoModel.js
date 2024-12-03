import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Veiculos {
  static async create(data) {
    const cleanData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === '' ? null : value
      ])
    );

    return knex("veiculos")
      .insert(cleanData)
      .returning("*");
  }

  static async findAll() {
    return knex("veiculos")
      .select("*");
  }

  static async findById(id) {
    return knex("veiculos")
      .where({ id })
      .first();
  }

  static async update(id, data) {
    return knex("veiculos")
      .where({ id })
      .update(data)
      .returning("*");
  }

  static async delete(id) {
    return knex("veiculos")
      .where({ id })
      .del();
  }

  static async findByPlaca(placa) {
    return knex("veiculos")
      .where({ placa })
      .first();
  }
}

export default Veiculos; 