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
    database: "Siscarim"
});

// app.post('/criar', (req, res) => {
//     db.query("INSERT INTO usuarios (email, password) VALUES ('laurawebsternp@gmail.com', 'Teste@123')",
//         (err, result) => {
//         if(err){
//             return res.send(err);
//         }
//         res.send(res);
//     })
// });

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE `email` = ? AND `password` = ?';

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            return res.send(err);
        }
        res.send(res);
    })
});

app.listen(8081, () => {
    console.log("Servidor rodando");
})