/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.raw('ALTER TABLE doacao DROP CONSTRAINT IF EXISTS doacao_status_check');
  return knex.raw(`
    ALTER TABLE doacao 
    ADD CONSTRAINT doacao_status_check 
    CHECK (status IN ('pendente', 'confirmada', 'cancelada', 'repassado'))
  `);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.raw('ALTER TABLE doacao DROP CONSTRAINT IF EXISTS doacao_status_check');
  return knex.raw(`
    ALTER TABLE doacao 
    ADD CONSTRAINT doacao_status_check 
    CHECK (status IN ('pendente', 'confirmada', 'cancelada'))
  `);
}