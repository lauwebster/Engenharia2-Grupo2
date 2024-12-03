export async function up(knex) {
  await knex.raw(
    "ALTER TABLE exame DROP CONSTRAINT IF EXISTS exame_status_check"
  );
  return knex.raw(`
      ALTER TABLE exame 
      ADD CONSTRAINT exame_status_check 
      CHECK (status IN ('pendente', 'realizado', 'cancelado', 'retirado'))
    `);
}

export async function down(knex) {
  await knex.raw(
    "ALTER TABLE exame DROP CONSTRAINT IF EXISTS exame_status_check"
  );
  return knex.raw(`
      ALTER TABLE exame 
      ADD CONSTRAINT exame_status_check 
      CHECK (status IN ('pendente', 'realizado', 'cancelado'))
    `);
}
