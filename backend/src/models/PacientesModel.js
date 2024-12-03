import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Pacientes {
  static async create(data) {
    const cleanData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key, 
        value === '' ? null : value
      ])
    );

    return knex("pacientes")
      .insert(cleanData)
      .returning("*");
  }

  static async findById(id) {
    return knex("pacientes").where({ id }).first();
  }

  static async findAll() {
    return knex("pacientes").select("*");
  }

  static async update(id, data) {
    return knex("pacientes").where({ id }).update(data).returning("*");
  }

  static async delete(id) {
    return knex("pacientes").where({ id }).del();
  }

  static async findByCpf(cpf) {
    return knex("pacientes").where({ cpf }).first();
  }
}

export default Pacientes; 