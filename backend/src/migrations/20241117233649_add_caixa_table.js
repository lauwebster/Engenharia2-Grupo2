/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .dropTableIfExists('caixa')
    .dropTableIfExists('movimento_caixa')
    .createTable('caixa', table => {
      table.increments('id');
      table.date('data_abertura').notNullable();
      table.time('hora_abertura').notNullable();
      table.decimal('saldo_inicial', 10, 2).notNullable();
      table.decimal('saldo_final', 10, 2);
      table.date('data_fechamento');
      table.time('hora_fechamento');
      table.enum('status', ['aberto', 'fechado']).defaultTo('aberto');
      table.text('observacoes');
      table.integer('responsavel_id').notNullable().references('id').inTable('usuario');
      table.integer('responsavel_fechamento_id').references('id').inTable('usuario');
      table.timestamps(true, true);
    })
    .createTable('movimento_caixa', table => {
      table.increments('id');
      table.integer('caixa_id').notNullable().references('id').inTable('caixa');
      table.enum('tipo_movimento', ['entrada', 'saida']).notNullable();
      table.decimal('valor', 10, 2).notNullable();
      table.text('descricao');
      table.integer('responsavel_id').notNullable().references('id').inTable('usuario');
      table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable('movimento_caixa')
    .dropTable('caixa');
}