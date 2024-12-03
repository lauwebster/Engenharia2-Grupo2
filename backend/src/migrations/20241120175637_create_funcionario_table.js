/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("funcionario", (table) => {
    table.increments("id");
    table.string("nome", 100).notNullable();
    table.string("cpf", 11).unique().notNullable();
    table.string("email", 100);
    table.string("telefone", 20);
    table.date("data_nascimento");
    table.date("data_admissao");
    table.string("cargo", 50);
    table.decimal("salario", 10, 2);
    table.integer("setor_id").references("id").inTable("setor");
    table
      .enum("status", ["ativo", "inativo", "ferias", "afastado"])
      .defaultTo("ativo");
    table.timestamps(true, true);

    table.index(["cpf"]);
    table.index(["nome"]);
    table.index(["setor_id"]);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("funcionario");
}
