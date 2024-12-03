export async function up(knex) {
  await knex.raw(`
    DROP TABLE IF EXISTS distribuicao_recurso;
    DROP TABLE IF EXISTS parametrizacao;
    DROP TABLE IF EXISTS pacientes_transporte;
    DROP TABLE IF EXISTS transporte;
    DROP TABLE IF EXISTS veiculos;
    DROP TABLE IF EXISTS motorista;
    DROP TABLE IF EXISTS exame;
    DROP TABLE IF EXISTS tipo_exame;
    DROP TABLE IF EXISTS caixa;
    DROP TABLE IF EXISTS despesa;
    DROP TABLE IF EXISTS agendar_consulta;
    DROP TABLE IF EXISTS doacao;
    DROP TABLE IF EXISTS recurso;
    DROP TABLE IF EXISTS encaminhamentos;
    DROP TABLE IF EXISTS pacientes;
    DROP TABLE IF EXISTS usuario;
    DROP TABLE IF EXISTS setor;
    DROP TABLE IF EXISTS instituicoes;
  `);

  await knex.schema
    .createTable('instituicoes', table => {
      table.increments('id');
      table.string('nome', 100).notNullable();
      table.string('endereco', 100);
      table.string('telefone', 20);
      table.string('especialidade', 50);
      table.index('nome');
    })

    .createTable('usuario', table => {
      table.increments('id');
      table.string('username', 50).notNullable().unique();
      table.string('senha', 255).notNullable();
      table.timestamp('ultimo_login');
      table.tinyint('permissao').notNullable().defaultTo(0);
      table.boolean('status').defaultTo(true);
      table.index('username');
    })

    .createTable('setor', table => {
      table.increments('id');
      table.string('descricao', 100);
      table.string('nome', 50).notNullable();
      table.smallint('n_funcionario_avaliavel');
      table.enum('status', ['ativo', 'inativo']).defaultTo('ativo');
      table.index('nome');
    })

    .createTable('pacientes', table => {
      table.increments('id');
      table.string('nome', 100).notNullable();
      table.string('cpf', 11).unique();
      table.string('email', 100);
      table.date('data_nascimento');
      table.string('telefone', 20);
      table.index(['cpf', 'nome']);
    })

    .createTable('encaminhamentos', table => {
      table.increments('id');
      table.integer('paciente_id').notNullable().references('id').inTable('pacientes');
      table.integer('instituicao_id').notNullable().references('id').inTable('instituicoes');
      table.date('data_encaminhamento').notNullable();
      table.enum('status', ['pendente', 'concluido', 'cancelado']).defaultTo('pendente');
      table.text('observacoes');
      table.index(['paciente_id', 'instituicao_id', 'data_encaminhamento']);
    })

    .createTable('recurso', table => {
      table.increments('id');
      table.string('nome', 100).notNullable();
      table.string('descricao', 255);
      table.decimal('valor_unitario', 10, 2);
      table.integer('quantidade_disponivel');
      table.enum('status', ['disponivel', 'indisponivel']).defaultTo('disponivel');
      table.index('nome');
    })

    .createTable('doacao', table => {
      table.increments('id');
      table.integer('paciente_id').references('id').inTable('pacientes');
      table.date('data_doacao').notNullable();
      table.decimal('valor', 10, 2);
      table.text('observacoes');
      table.enum('status', ['pendente', 'confirmada', 'cancelada']).defaultTo('pendente');
      table.index(['paciente_id', 'data_doacao']);
    })

    .createTable('agendar_consulta', table => {
      table.increments('id');
      table.integer('paciente_id').notNullable().references('id').inTable('pacientes');
      table.integer('instituicao_id').notNullable().references('id').inTable('instituicoes');
      table.date('data_consulta').notNullable();
      table.time('horario').notNullable();
      table.enum('status', ['agendada', 'realizada', 'cancelada']).defaultTo('agendada');
      table.text('observacoes');
      table.index(['paciente_id', 'data_consulta']);
    })

    .createTable('despesa', table => {
      table.increments('id');
      table.string('descricao', 255).notNullable();
      table.decimal('valor', 10, 2).notNullable();
      table.date('data_despesa').notNullable();
      table.enum('tipo', ['fixa', 'variavel']).notNullable();
      table.enum('status', ['pendente', 'paga', 'cancelada']).defaultTo('pendente');
      table.index(['data_despesa', 'tipo']);
    })

    .createTable('caixa', table => {
      table.increments('id');
      table.decimal('saldo', 12, 2).notNullable();
      table.date('data_movimento').notNullable();
      table.enum('tipo_movimento', ['entrada', 'saida']).notNullable();
      table.text('descricao');
      table.integer('doacao_id').references('id').inTable('doacao');
      table.integer('despesa_id').references('id').inTable('despesa');
      table.index('data_movimento');
    })

    .createTable('tipo_exame', table => {
      table.increments('id');
      table.string('nome', 100).notNullable();
      table.string('descricao', 255);
      table.decimal('valor', 10, 2);
      table.index('nome');
    })

    .createTable('exame', table => {
      table.increments('id');
      table.integer('paciente_id').notNullable().references('id').inTable('pacientes');
      table.integer('tipo_exame_id').notNullable().references('id').inTable('tipo_exame');
      table.date('data_exame').notNullable();
      table.text('resultado');
      table.enum('status', ['pendente', 'realizado', 'cancelado']).defaultTo('pendente');
      table.index(['paciente_id', 'data_exame']);
    })

    .createTable('motorista', table => {
      table.increments('id');
      table.string('nome', 100).notNullable();
      table.string('cnh', 20).notNullable().unique();
      table.date('validade_cnh').notNullable();
      table.enum('status', ['ativo', 'inativo']).defaultTo('ativo');
      table.index(['nome', 'cnh']);
    })

    .createTable('veiculos', table => {
      table.increments('id');
      table.string('placa', 8).notNullable().unique();
      table.string('modelo', 50).notNullable();
      table.integer('ano');
      table.integer('capacidade');
      table.enum('status', ['disponivel', 'em_uso', 'manutencao']).defaultTo('disponivel');
      table.index('placa');
    })

    .createTable('transporte', table => {
      table.increments('id');
      table.integer('motorista_id').notNullable().references('id').inTable('motorista');
      table.integer('veiculo_id').notNullable().references('id').inTable('veiculos');
      table.date('data_transporte').notNullable();
      table.time('horario_saida').notNullable();
      table.time('horario_retorno');
      table.enum('status', ['agendado', 'em_andamento', 'concluido', 'cancelado']).defaultTo('agendado');
      table.index(['data_transporte', 'motorista_id']);
    })

    .createTable('pacientes_transporte', table => {
      table.increments('id');
      table.integer('paciente_id').notNullable().references('id').inTable('pacientes');
      table.integer('transporte_id').notNullable().references('id').inTable('transporte');
      table.string('local_destino', 255).notNullable();
      table.text('observacoes');
      table.index(['paciente_id', 'transporte_id']);
    })

    .createTable('parametrizacao', table => {
      table.increments('id');
      table.string('parametro', 50).notNullable().unique();
      table.string('valor', 255).notNullable();
      table.string('descricao', 255);
      table.index('parametro');
    })

    .createTable('distribuicao_recurso', table => {
      table.increments('id');
      table.integer('recurso_id').notNullable().references('id').inTable('recurso');
      table.integer('paciente_id').notNullable().references('id').inTable('pacientes');
      table.integer('quantidade').notNullable();
      table.date('data_distribuicao').notNullable();
      table.text('observacoes');
      table.index(['recurso_id', 'paciente_id', 'data_distribuicao']);
    })

  await knex.schema.alterTable('usuario', table => {
    table.integer('funcionario_id').references('id').inTable('setor');
  });

  await knex.schema.alterTable('setor', table => {
    table.integer('funcionario_id').references('id').inTable('usuario');
  });
}

export async function down(knex) {
  await knex.schema
    .alterTable('usuario', table => {
      table.dropForeign('funcionario_id');
    })
    .alterTable('setor', table => {
      table.dropForeign('funcionario_id');
    });

  return knex.schema
    .dropTableIfExists('distribuicao_recurso')
    .dropTableIfExists('parametrizacao')
    .dropTableIfExists('pacientes_transporte')
    .dropTableIfExists('transporte')
    .dropTableIfExists('veiculos')
    .dropTableIfExists('motorista')
    .dropTableIfExists('exame')
    .dropTableIfExists('tipo_exame')
    .dropTableIfExists('caixa')
    .dropTableIfExists('despesa')
    .dropTableIfExists('agendar_consulta')
    .dropTableIfExists('doacao')
    .dropTableIfExists('recurso')
    .dropTableIfExists('encaminhamentos')
    .dropTableIfExists('pacientes')
    .dropTableIfExists('usuario')
    .dropTableIfExists('setor')
    .dropTableIfExists('instituicoes');
} 