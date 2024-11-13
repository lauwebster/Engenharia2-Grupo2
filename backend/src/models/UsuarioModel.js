const knex = require("knex")(require("../config/knexfile").development);

class User {
  static async create(data) {
    return knex("usuarios").insert(data).returning("*");
  }

  static async findById(id) {
    return knex("usuarios").where({ id }).first();
  }

  static async findAll() {
    return knex("usuarios").select("*");
  }

  static async update(id, data) {
    return knex("usuarios").where({ id }).update(data).returning("*");
  }

  static async delete(id) {
    return knex("usuarios").where({ id }).del();
  }

  static async findByEmail(email){
    return knex("usuarios").where({email}).first();
  }

  static async comparaSenha(email, senha){
    return knex("usuarios").where({email}).andWhere({senha}).first();
  }
}

module.exports = User;
