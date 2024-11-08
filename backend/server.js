const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco para múltiplas instruções
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "siscarim_schema",
    multipleStatements: true,
    ssl: false
});


app.get('/criar', (req, res) => {
    const sql = `
    CREATE TABLE IF NOT EXISTS Usuarios (
        id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(45) NOT NULL,
        senha VARCHAR(45) NOT NULL,
        PRIMARY KEY (id)
    );
    INSERT INTO Usuarios (email, senha) VALUES ('laura@gmail.com', 'Teste@123');

    CREATE TABLE IF NOT EXISTS Instituicoes (
        idInstituicoes INT NOT NULL AUTO_INCREMENT,
        nomeInstituicao VARCHAR(45) NOT NULL,
        enderecoInstituicao VARCHAR(100) NOT NULL,
        telefoneInstituicao VARCHAR(45) NOT NULL,
        especialidadeInstituicao VARCHAR(45) NOT NULL,
        PRIMARY KEY (idInstituicoes)
    );
    INSERT INTO Instituicoes(nomeInstituicao, enderecoInstituicao, telefoneInstituicao, especialidadeInstituicao)
    VALUES ('Hospital de Amor', 'R. Antenor Duarte Viléla, 1331, Barretos - SP', '(17) 3321-6600', 'Prevenção e Tratamento de Câncer');

    CREATE TABLE IF NOT EXISTS Setor (
        idSetor INT NOT NULL AUTO_INCREMENT,
        nomeSetor VARCHAR(45) NOT NULL,
        PRIMARY KEY (idSetor)
    );
    INSERT INTO Setor(nomeSetor) VALUES ('Pacientes'),('Exames'),('Funcionários'),('Despesas'),('Consultas'),('Doações');
    
    CREATE TABLE IF NOT EXISTS Pacientes (
        idPaciente INT NOT NULL AUTO_INCREMENT,
        nomePaciente VARCHAR(45) NOT NULL,
        cpfPaciente VARCHAR(45) NOT NULL,
        emailPaciente VARCHAR(45) NOT NULL,
        dataNascimentoPaciente DATE NOT NULL,
        telefonePaciente VARCHAR(45) NOT NULL,
        PRIMARY KEY (idPaciente)
    );

    CREATE TABLE IF NOT EXISTS Encaminhamentos (
        idEncaminhamentos INT NOT NULL AUTO_INCREMENT,
        dataEncaminhamento DATE NOT NULL,
        descricaoEncaminhamento VARCHAR(45) NOT NULL,
        statusEncaminhamento VARCHAR(45) NOT NULL,
        Pacientes_idPaciente INT NOT NULL,
        Instituicoes_idInstituicoes INT NOT NULL,
        PRIMARY KEY (idEncaminhamentos),
        FOREIGN KEY (Pacientes_idPaciente) REFERENCES Pacientes(idPaciente),
        FOREIGN KEY (Instituicoes_idInstituicoes) REFERENCES Instituicoes(idInstituicoes)
    );

    CREATE TABLE IF NOT EXISTS Recurso (
        idRecurso INT NOT NULL AUTO_INCREMENT,
        descricao VARCHAR(45) NOT NULL,
        dataRecebimento DATE NOT NULL,
        valor DOUBLE NOT NULL,
        recursoUnico VARCHAR(45) NOT NULL,
        origemRecurso VARCHAR(45) NOT NULL,
        PRIMARY KEY (idRecurso)
    );

    CREATE TABLE IF NOT EXISTS Doacao (
        idDoacao INT NOT NULL AUTO_INCREMENT,
        dataDoacao DATE NOT NULL,
        valorDoacao DOUBLE NOT NULL,
        metodoDoacao VARCHAR(45) NOT NULL,
        Setor_idSetor INT NOT NULL,
        dataDistribuicao DATE NOT NULL,
        PRIMARY KEY (idDoacao),
        FOREIGN KEY (Setor_idSetor) REFERENCES Setor(idSetor)
    );

    CREATE TABLE IF NOT EXISTS Agendar_Consulta (
        idAgendar_Consulta INT NOT NULL AUTO_INCREMENT,
        dataConsulta DATETIME NOT NULL,
        anexos VARCHAR(45) NOT NULL,
        Pacientes_idPaciente INT NOT NULL,
        PRIMARY KEY (idAgendar_Consulta),
        FOREIGN KEY (Pacientes_idPaciente) REFERENCES Pacientes(idPaciente)
    );

    CREATE TABLE IF NOT EXISTS Caixa (
        idCaixa INT NOT NULL AUTO_INCREMENT,
        dataAbertura DATE NOT NULL,
        PRIMARY KEY (idCaixa)
    );

    CREATE TABLE IF NOT EXISTS Despesa (
        idDespesa INT NOT NULL AUTO_INCREMENT,
        descricao VARCHAR(45) NOT NULL,
        dataVencimento DATE NOT NULL,
        valor DOUBLE NOT NULL,
        metodoPagamento VARCHAR(45) NOT NULL,
        dataPagamento DATE NOT NULL,
        Caixa_idCaixa INT NOT NULL,
        PRIMARY KEY (idDespesa),
        FOREIGN KEY (Caixa_idCaixa) REFERENCES Caixa(idCaixa)
    );
    `;
    
    // Executando a query SQL para criar as tabelas e inserir dados iniciais
    db.query(sql, (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send("Tabelas e dados iniciais criados com sucesso!");
    });
});

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM Usuarios WHERE email = ? AND senha = ?';
    const email = req.body.email;
    const senha = req.body.senha;
    const values = [email, senha];
    console.log("Bateu na rota do backend");
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.send({ error: err });
        }
        if (data.length > 0) {
            res.send(data); // Usuário autenticado com sucesso
        } else {
            res.send({
                message: 'Credenciais não batem!'
            });
        }
    });
});

app.listen(8081, () => {
    console.log("Servidor rodando");
})