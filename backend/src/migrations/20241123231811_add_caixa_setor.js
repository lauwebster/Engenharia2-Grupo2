export async function up(knex) {
    // Check if Caixa sector already exists
    const caixaSetor = await knex('setor')
      .where('nome', 'Caixa')
      .first();
  
    if (!caixaSetor) {
      await knex('setor').insert({
        nome: 'Caixa',
        descricao: 'Setor responsável pelo controle de caixa e recebimento de doações',
        saldo: 0,
        status: 'ativo',
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      });
    }
  }
  
  export async function down(knex) {
    await knex('setor')
      .where('nome', 'Caixa')
      .del();
  }