import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

const UserRoles = {
  ADMIN: 1,
  USER: 0,
};

class User {
  static async create(data) {
    return knex("usuario").insert({
      username: data.username,
      senha: data.senha,
      email: data.email,
      permissao: data.permissao,
      status: data.status
    }).returning("*");
  }

  static async findById(id) {
    return knex("usuario").where({ id }).first();
  }

  static async findAll() {
    return knex("usuario").select("*");
  }

  static async update(id, data) {
    return knex("usuario").where({ id }).update(data).returning("*");
  }

  static async delete(id) {
    return knex("usuario").where({ id }).del();
  }

  static async findByEmail(email) {
    return knex("usuario").where({ email }).first();
  }

  static async comparaSenha(email, senha) {
    return knex("usuario").where({ email }).andWhere({ senha }).first();
  }

  static async count() {
    const result = await knex("usuario").count("id as count").first();
    return parseInt(result.count);
  }

  static async updateStatus(id, status) {
    return knex("usuario")
      .where({ id })
      .update({ status })
      .returning("*");
  }
}

export default User;
