import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Setor {
  static async create(data) {
    return knex("setor")
      .insert(data)
      .returning("*");
  }

  static async findAll() {
    return knex("setor")
      .select("*");
  }

  static async findById(id) {
    return knex("setor")
      .where({ id })
      .first();
  }

  static async update(id, data) {
    return knex("setor")
      .where({ id })
      .update(data)
      .returning("*");
  }

  static async addFunds(id, valor) {
    return knex.transaction(async (trx) => {
      const setor = await trx("setor")
        .where({ id })
        .first();

      if (!setor) throw new Error("Setor não encontrado");

      const novoSaldo = parseFloat(setor.saldo) + parseFloat(valor);

      return trx("setor")
        .where({ id })
        .update({ saldo: novoSaldo })
        .returning("*");
    });
  }

  static async createRepasse(data) {
    return knex.transaction(async (trx) => {
      const [repasse] = await trx("repasse")
        .insert(data)
        .returning("*");

      await trx("setor")
        .where({ id: data.setor_id })
        .increment("saldo", data.valor);

      return repasse;
    });
  }

  static async getRepasses(setorId = null) {
    const query = knex("repasse")
      .select(
        "repasse.*",
        "setor.nome as setor_nome",
        "usuario.nome as responsavel_nome"
      )
      .join("setor", "repasse.setor_id", "setor.id")
      .join("usuario", "repasse.responsavel_id", "usuario.id")
      .orderBy("repasse.created_at", "desc");

    if (setorId) {
      query.where("setor_id", setorId);
    }

    return query;
  }
}

export default Setor; 