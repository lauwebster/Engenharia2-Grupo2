DROP TABLE IF EXISTS Distribuicao_Recurso;
DROP TABLE IF EXISTS Parametrizacao;
DROP TABLE IF EXISTS Pacientes_Transporte;
DROP TABLE IF EXISTS Veiculos;
DROP TABLE IF EXISTS Motorista;
DROP TABLE IF EXISTS Transporte;
DROP TABLE IF EXISTS TipoExame;
DROP TABLE IF EXISTS Exame;
DROP TABLE IF EXISTS Caixa;
DROP TABLE IF EXISTS Despesa;
DROP TABLE IF EXISTS Agendar_Consulta;
DROP TABLE IF EXISTS Doacao;
DROP TABLE IF EXISTS Recurso;
DROP TABLE IF EXISTS Encaminhamentos;
DROP TABLE IF EXISTS Pacientes;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS Setor;
DROP TABLE IF EXISTS Instituicoes;

CREATE TABLE Instituicoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(100),
    telefone VARCHAR(20),
    especialidade VARCHAR(50),
    INDEX idx_nome (nome)
);

CREATE TABLE Setor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(100),
    nome VARCHAR(50) NOT NULL,
    n_funcionario_avaliavel SMALLINT,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    funcionario_id INT,
    INDEX idx_nome (nome)
);

CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    ultimo_login TIMESTAMP,
    permissao TINYINT NOT NULL DEFAULT 0,
    funcionario_id INT,
    status TINYINT(1) DEFAULT 1,
    INDEX idx_username (username)
);

CREATE TABLE Pacientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE,
    email VARCHAR(100),
    data_nascimento DATE,
    telefone VARCHAR(20),
    INDEX idx_cpf (cpf),
    INDEX idx_nome (nome)
);

CREATE TABLE Encaminhamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    instituicao_id INT NOT NULL,
    data_encaminhamento DATE NOT NULL,
    status ENUM('pendente', 'concluido', 'cancelado') DEFAULT 'pendente',
    observacoes TEXT,
    INDEX idx_paciente (paciente_id),
    INDEX idx_instituicao (instituicao_id),
    INDEX idx_data (data_encaminhamento)
);

CREATE TABLE Recurso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    quantidade INT NOT NULL DEFAULT 0,
    valor_unitario DECIMAL(10,2),
    status ENUM('disponivel', 'indisponivel') DEFAULT 'disponivel',
    INDEX idx_nome (nome)
);

CREATE TABLE Doacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recurso_id INT NOT NULL,
    quantidade INT NOT NULL,
    data_doacao DATE NOT NULL,
    doador VARCHAR(100),
    valor_total DECIMAL(10,2),
    INDEX idx_recurso (recurso_id),
    INDEX idx_data (data_doacao)
);

CREATE TABLE Agendar_Consulta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    instituicao_id INT NOT NULL,
    data_consulta DATETIME NOT NULL,
    status ENUM('agendada', 'realizada', 'cancelada') DEFAULT 'agendada',
    observacoes TEXT,
    INDEX idx_paciente (paciente_id),
    INDEX idx_instituicao (instituicao_id),
    INDEX idx_data (data_consulta)
);

CREATE TABLE Despesa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(200) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_despesa DATE NOT NULL,
    categoria VARCHAR(50),
    status ENUM('pendente', 'pago') DEFAULT 'pendente',
    INDEX idx_data (data_despesa),
    INDEX idx_categoria (categoria)
);

CREATE TABLE Caixa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_movimento ENUM('entrada', 'saida') NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_movimento DATETIME NOT NULL,
    descricao VARCHAR(200),
    responsavel_id INT,
    INDEX idx_data (data_movimento),
    INDEX idx_tipo (tipo_movimento)
);

CREATE TABLE TipoExame (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    valor_referencia VARCHAR(100),
    INDEX idx_nome (nome)
);

CREATE TABLE Exame (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    tipo_exame_id INT NOT NULL,
    data_exame DATE NOT NULL,
    resultado TEXT,
    status ENUM('pendente', 'realizado', 'cancelado') DEFAULT 'pendente',
    INDEX idx_paciente (paciente_id),
    INDEX idx_tipo (tipo_exame_id),
    INDEX idx_data (data_exame)
);

CREATE TABLE Motorista (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cnh VARCHAR(20) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    INDEX idx_nome (nome),
    INDEX idx_cnh (cnh)
);

CREATE TABLE Veiculos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    placa VARCHAR(10) NOT NULL UNIQUE,
    modelo VARCHAR(50) NOT NULL,
    capacidade SMALLINT NOT NULL,
    status ENUM('disponivel', 'em_uso', 'manutencao') DEFAULT 'disponivel',
    INDEX idx_placa (placa)
);

CREATE TABLE Transporte (
    id INT PRIMARY KEY AUTO_INCREMENT,
    motorista_id INT NOT NULL,
    veiculo_id INT NOT NULL,
    data_transporte DATETIME NOT NULL,
    status ENUM('agendado', 'em_andamento', 'concluido', 'cancelado') DEFAULT 'agendado',
    INDEX idx_motorista (motorista_id),
    INDEX idx_veiculo (veiculo_id),
    INDEX idx_data (data_transporte)
);

CREATE TABLE Pacientes_Transporte (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transporte_id INT NOT NULL,
    paciente_id INT NOT NULL,
    endereco_coleta VARCHAR(200) NOT NULL,
    endereco_destino VARCHAR(200) NOT NULL,
    horario_coleta TIME NOT NULL,
    INDEX idx_transporte (transporte_id),
    INDEX idx_paciente (paciente_id)
);

CREATE TABLE Parametrizacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    chave VARCHAR(50) NOT NULL UNIQUE,
    valor TEXT NOT NULL,
    descricao VARCHAR(200),
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_chave (chave)
);

CREATE TABLE Distribuicao_Recurso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recurso_id INT NOT NULL,
    paciente_id INT NOT NULL,
    quantidade INT NOT NULL,
    data_distribuicao DATE NOT NULL,
    observacoes TEXT,
    INDEX idx_recurso (recurso_id),
    INDEX idx_paciente (paciente_id),
    INDEX idx_data (data_distribuicao)
);

ALTER TABLE Setor
ADD CONSTRAINT fk_setor_funcionario
FOREIGN KEY (funcionario_id) REFERENCES Usuario(id);

ALTER TABLE Usuario
ADD CONSTRAINT fk_usuario_funcionario
FOREIGN KEY (funcionario_id) REFERENCES Setor(id);

ALTER TABLE Encaminhamentos
ADD CONSTRAINT fk_encaminhamento_paciente
FOREIGN KEY (paciente_id) REFERENCES Pacientes(id),
ADD CONSTRAINT fk_encaminhamento_instituicao
FOREIGN KEY (instituicao_id) REFERENCES Instituicoes(id);

ALTER TABLE Doacao
ADD CONSTRAINT fk_doacao_recurso
FOREIGN KEY (recurso_id) REFERENCES Recurso(id);

ALTER TABLE Agendar_Consulta
ADD CONSTRAINT fk_consulta_paciente
FOREIGN KEY (paciente_id) REFERENCES Pacientes(id),
ADD CONSTRAINT fk_consulta_instituicao
FOREIGN KEY (instituicao_id) REFERENCES Instituicoes(id);

ALTER TABLE Caixa
ADD CONSTRAINT fk_caixa_responsavel
FOREIGN KEY (responsavel_id) REFERENCES Usuario(id);

ALTER TABLE Exame
ADD CONSTRAINT fk_exame_paciente
FOREIGN KEY (paciente_id) REFERENCES Pacientes(id),
ADD CONSTRAINT fk_exame_tipo
FOREIGN KEY (tipo_exame_id) REFERENCES TipoExame(id);

ALTER TABLE Transporte
ADD CONSTRAINT fk_transporte_motorista
FOREIGN KEY (motorista_id) REFERENCES Motorista(id),
ADD CONSTRAINT fk_transporte_veiculo
FOREIGN KEY (veiculo_id) REFERENCES Veiculos(id);

ALTER TABLE Pacientes_Transporte
ADD CONSTRAINT fk_paciente_transporte_transporte
FOREIGN KEY (transporte_id) REFERENCES Transporte(id),
ADD CONSTRAINT fk_paciente_transporte_paciente
FOREIGN KEY (paciente_id) REFERENCES Pacientes(id);

ALTER TABLE Distribuicao_Recurso
ADD CONSTRAINT fk_distribuicao_recurso
FOREIGN KEY (recurso_id) REFERENCES Recurso(id),
ADD CONSTRAINT fk_distribuicao_paciente
FOREIGN KEY (paciente_id) REFERENCES Pacientes(id);