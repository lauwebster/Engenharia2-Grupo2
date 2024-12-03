import knexConfig from "../config/knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(knexConfig.development);

class Despesa {
  static async create(data) {
    try {
      const validColumns = [
        'descricao',
        'valor',
        'data_despesa',
        'tipo',
        'status',
        'caixa_id'
      ];

      const cleanData = Object.fromEntries(
        Object.entries(data)
          .filter(([key]) => validColumns.includes(key))
          .map(([key, value]) => [
            key,
            value === '' ? null : value
          ])
      );

      const validTipos = ['fixa', 'variavel'];
      if (cleanData.tipo && !validTipos.includes(cleanData.tipo)) {
        throw new Error(`Tipo inválido. Deve ser um dos seguintes: ${validTipos.join(', ')}`);
      }

      const validStatus = ['pendente', 'paga', 'cancelada'];
      cleanData.status = (cleanData.status || 'pendente').toLowerCase();

      if (!validStatus.includes(cleanData.status)) {
        throw new Error(`Status inválido. Deve ser um dos seguintes: ${validStatus.join(', ')}`);
      }

      const result = await knex("despesa")
        .insert(cleanData)
        .returning("*");

      return result;
    } catch (error) {
      console.error('Error in Despesa.create:', error);
      throw error;
    }
  }

  static async findAll() {
    return knex("despesa as d")
      .select(
        "d.*",
        knex.raw(`
          CASE 
            WHEN d.caixa_id IS NOT NULL 
            THEN to_char(
              (c.data_fechamento || ' ' || c.hora_fechamento)::timestamp - interval '3 hours', 
              'YYYY-MM-DD HH24:MI:SS'
            )
            ELSE NULL 
          END as data_pagamento
        `)
      )
      .leftJoin("caixa as c", "d.caixa_id", "c.id")
      .orderBy("d.data_despesa", "desc");
  }

  static async findById(id) {
    const result = await knex("despesa")
      .where({ id })
      .first();
    
    if (result) {
      const date = new Date(result.data_despesa);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      result.data_despesa = date.toISOString().split('T')[0];
    }
    
    return result;
  }

  static async update(id, data) {
    try {
      const validColumns = [
        'descricao',
        'valor',
        'data_despesa',
        'tipo',
        'status',
        'caixa_id'
      ];

      const cleanData = Object.fromEntries(
        Object.entries(data)
          .filter(([key]) => validColumns.includes(key))
          .map(([key, value]) => [
            key,
            value === '' ? null : value
          ])
      );

      if (cleanData.status) {
        const validStatus = ['pendente', 'paga', 'cancelada'];
        if (!validStatus.includes(cleanData.status.toLowerCase())) {
          throw new Error(`Status inválido. Deve ser um dos seguintes: ${validStatus.join(', ')}`);
        }
        cleanData.status = cleanData.status.toLowerCase();
      }

      const result = await knex("despesa")
        .where({ id })
        .update(cleanData)
        .returning("*");


      return result;
    } catch (error) {
      console.error('Error in Despesa.update:', error);
      throw error;
    }
  }

  static async delete(id) {
    return knex("despesa")
      .where({ id })
      .del();
  }
}

export default Despesa; 