import knexConfig from "../config/knexfile.js";
import knexInitializer from 'knex';

const knex = knexInitializer(knexConfig.development);

class Transporte {
  static async findAll() {
    return knex('transporte as t')
      .select(
        't.*',
        'v.placa as veiculo_placa',
        'v.modelo as veiculo_modelo',
        'm.nome as motorista_nome',
        knex.raw('COALESCE(STRING_AGG(p.nome, \', \'), \'Sem pacientes\') as pacientes_nomes'),
        knex.raw('COALESCE(STRING_AGG(pt.local_destino, \', \'), \'Sem destinos\') as destinos')
      )
      .leftJoin('veiculos as v', 't.veiculo_id', 'v.id')
      .leftJoin('motorista as m', 't.motorista_id', 'm.id')
      .leftJoin('pacientes_transporte as pt', 'pt.transporte_id', 't.id')
      .leftJoin('pacientes as p', 'pt.paciente_id', 'p.id')
      .groupBy(
        't.id',
        't.motorista_id',
        't.veiculo_id',
        't.data_transporte',
        't.horario_saida',
        't.horario_retorno',
        't.status',
        'v.placa',
        'v.modelo',
        'm.nome'
      )
      .orderBy('t.data_transporte', 'desc');
  }

  static async findById(id) {
    const transporte = await knex('transporte as t')
      .select(
        't.*',
        'v.placa as veiculo_placa',
        'v.modelo as veiculo_modelo',
        'm.nome as motorista_nome'
      )
      .leftJoin('veiculos as v', 't.veiculo_id', 'v.id')
      .leftJoin('motorista as m', 't.motorista_id', 'm.id')
      .where('t.id', id)
      .first();

    if (transporte) {
      const pacientes = await knex('pacientes_transporte as pt')
        .select(
          'p.id as paciente_id',
          'p.nome as paciente_nome',
          'pt.local_destino',
          'pt.observacoes'
        )
        .leftJoin('pacientes as p', 'pt.paciente_id', 'p.id')
        .where('pt.transporte_id', id);

      transporte.pacientes = pacientes;
    }

    return transporte;
  }

  static async create(data) {
    return knex('transporte')
      .insert(data)
      .returning('*');
  }

  static async update(id, data) {
    return knex('transporte')
      .where({ id })
      .update(data)
      .returning('*');
  }

  static async delete(id) {
    await knex('pacientes_transporte')
      .where('transporte_id', id)
      .del();

    return knex('transporte')
      .where({ id })
      .del();
  }

  static async createWithPacientes({ transporte, pacientes }) {
    const trx = await knex.transaction();
    
    try {
      const [newTransporte] = await trx('transporte')
        .insert(transporte)
        .returning('*');

      if (pacientes && pacientes.length > 0) {
        await trx('pacientes_transporte').insert(
          pacientes.map(p => ({
            paciente_id: p.paciente_id,
            transporte_id: newTransporte.id,
            local_destino: p.local_destino,
            observacoes: p.observacoes
          }))
        );
      }

      await trx.commit();
      return newTransporte;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}

export default Transporte;