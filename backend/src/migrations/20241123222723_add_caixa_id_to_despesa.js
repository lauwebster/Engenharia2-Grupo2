/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable("despesa", (table) => {
    table.integer("caixa_id").references("id").inTable("caixa");
    table.index(["caixa_id"]);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable("despesa", (table) => {
    table.dropColumn("caixa_id");
  });
}
