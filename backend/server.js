const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "siscarim"
});

app.listen(8081, () => {
    console.log("Servidor rodando");
})