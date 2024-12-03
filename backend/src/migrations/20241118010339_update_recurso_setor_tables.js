/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('usuario', table => {
    table.dropForeign('funcionario_id');
    table.dropColumn('funcionario_id');
  });

  await knex.schema.alterTable('setor', table => {
    table.dropForeign('funcionario_id');
    table.dropColumn('funcionario_id');
  });

  await knex.schema.dropTableIfExists('repasse');
  await knex.schema.dropTableIfExists('setor');

  await knex.schema.createTable('setor', table => {
    table.increments('id');
    table.string('nome', 100).notNullable();
    table.text('descricao');
    table.decimal('saldo', 10, 2).defaultTo(0.00);
    table.integer('responsavel_id').references('id').inTable('usuario');
    table.enum('status', ['ativo', 'inativo']).defaultTo('ativo');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('repasse', table => {
    table.increments('id');
    table.integer('setor_id').notNullable().references('id').inTable('setor');
    table.decimal('valor', 10, 2).notNullable();
    table.date('data_repasse').notNullable();
    table.integer('responsavel_id').notNullable().references('id').inTable('usuario');
    table.text('observacoes');
    table.timestamps(true, true);
    
    table.index(['setor_id', 'data_repasse']);
  });

  return knex.schema.alterTable('recurso', table => {
    table.integer('setor_id').references('id').inTable('setor');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('recurso', table => {
    table.dropColumn('setor_id');
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });

  await knex.schema.dropTableIfExists('repasse');
  await knex.schema.dropTableIfExists('setor');

  await knex.schema.createTable('setor', table => {
    table.increments('id');
    table.string('descricao', 100);
    table.string('nome', 50).notNullable();
    table.smallint('n_funcionario_avaliavel');
    table.enum('status', ['ativo', 'inativo']).defaultTo('ativo');
    table.index('nome');
  });

  await knex.schema.alterTable('usuario', table => {
    table.integer('funcionario_id').references('id').inTable('setor');
  });

  await knex.schema.alterTable('setor', table => {
    table.integer('funcionario_id').references('id').inTable('usuario');
  });
}
