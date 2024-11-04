const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "siscarim_schema"
});

app.get('/criar', (req, res) => {
    //Criando tabela de usuários
    db.query("CREATE TABLE IF NOT EXISTS `usuarios` ("+
        "`id` int NOT NULL AUTO_INCREMENT,"+
        "`email` varchar(45) NOT NULL,"+
        "`senha` varchar(45) NOT NULL,"+
        "PRIMARY KEY (`id`));"+
        "INSERT INTO usuarios (email, senha) VALUES ('cassiano@gmail.com', 'Teste@123');" +
        "INSERT INTO usuarios (email, senha) VALUES ('laura@gmail.com', 'Teste@123');" +
        "INSERT INTO usuarios (email, senha) VALUES ('cassia@gmail.com', 'Teste@123');" +
        "INSERT INTO usuarios (email, senha) VALUES ('isa@gmail.com', 'Teste@123')" +
        "INSERT INTO usuarios (email, senha) VALUES ('luiza@gmail.com', 'Teste@123');" +
        //Criando os setores
        "CREATE TABLE `siscarim_schema`.`funcoes` (`idFuncao` INT NOT NULL AUTO_INCREMENT," +
        "`nomeFuncao` VARCHAR(45) NOT NULL," +
        "PRIMARY KEY (`idFuncao`));" +
        "INSERT INTO funcoes (nomeFuncao) VALUES ('Pacientes'),('Exames'),('Funcionários'),('Despesas'),('Consultas'),('Doações');",
        //Parametrização

        (err, result) => {
        if(err){
            return res.send(err);
        }
        res.send(res);
    })
});

app.get('/login', (req, res) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    const email = req.body.email;
    const senha = req.body.senha;
    const values = [email, senha];

    db.query(sql, values, (err, data) => {
        if(err){
            //Erro na requisição
           res.send({error: err})
        }
        if(data.length > 0){
            //Retornou a data, ou seja, email e senha
            res.send(data);
        }
        else{
            res.send({
                message: 'Credenciais não batem!'
            })
        }
        res.send(res);
    })
});

app.listen(8081, () => {
    console.log("Servidor rodando");
})