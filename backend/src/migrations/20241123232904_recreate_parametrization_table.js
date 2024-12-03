export async function up (knex) {
  return knex.schema
    .dropTableIfExists("parametrizacao")
    .createTable("parametrizacao", (table) => {
      table.increments("id").primary();
      table.string("nome").notNullable();
      table.string("sigla").notNullable();
      table.string("endereco").notNullable();
      table.string("telefone");
      table.string("email").notNullable();
      table.text("logo_url");
      table.text("descricao");
      table.timestamps(true, true);
    });
};

export async function down (knex) {
  return knex.schema.dropTable("parametrizacao");
};
