/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.raw(
    "ALTER TABLE agendar_consulta DROP CONSTRAINT IF EXISTS agendar_consulta_status_check"
  );
  return knex.raw(`
      ALTER TABLE agendar_consulta 
      ADD CONSTRAINT agendar_consulta_status_check 
      CHECK (status IN ('agendada', 'realizada', 'nao_compareceu', 'cancelada'))
    `);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.raw(
    "ALTER TABLE agendar_consulta DROP CONSTRAINT IF EXISTS agendar_consulta_status_check"
  );
  return knex.raw(`
      ALTER TABLE agendar_consulta 
      ADD CONSTRAINT agendar_consulta_status_check 
      CHECK (status IN ('agendada', 'realizada', 'cancelada'))
    `);
}
