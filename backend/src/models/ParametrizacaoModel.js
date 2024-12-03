import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Parametrizacao {
  static async create(data) {
    try {
      const validColumns = [
        'nome',
        'sigla',
        'endereco',
        'telefone',
        'email',
        'logo_url',
        'descricao'
      ];

      const cleanData = Object.fromEntries(
        Object.entries(data)
          .filter(([key]) => validColumns.includes(key))
          .map(([key, value]) => [
            key,
            value === '' ? null : value
          ])
      );

      if (cleanData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanData.email)) {
          throw new Error('Formato de email inválido');
        }
      }

      const result = await knex("parametrizacao")
        .insert(cleanData)
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Parametrizacao.create:', error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const result = await knex("parametrizacao")
        .select(
          'id',
          'nome',
          'sigla',
          'endereco',
          'telefone',
          'email',
          'logo_url',
          'descricao',
          'created_at',
          'updated_at'
        )
        .orderBy("created_at", "desc");
      return result || [];
    } catch (error) {
      console.error('Error in Parametrizacao.findAll:', error);
      throw error;
    }
  }

  static async findById(id) {
    return knex("parametrizacao")
      .where({ id })
      .first();
  }

  static async update(id, data) {
    try {
      const validColumns = [
        'nome',
        'sigla',
        'endereco',
        'telefone',
        'email',
        'logo_url',
        'descricao'
      ];

      const cleanData = Object.fromEntries(
        Object.entries(data)
          .filter(([key]) => validColumns.includes(key))
          .map(([key, value]) => [
            key,
            value === '' ? null : value
          ])
      );

      if (cleanData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanData.email)) {
          throw new Error('Formato de email inválido');
        }
      }

      const result = await knex("parametrizacao")
        .where({ id })
        .update(cleanData)
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Parametrizacao.update:', error);
      throw error;
    }
  }

  static async delete(id) {
    return knex("parametrizacao")
      .where({ id })
      .del();
  }
}

export default Parametrizacao;