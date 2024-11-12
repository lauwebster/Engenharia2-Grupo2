const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  console.log("Recebido:", { email, senha });
  
  // Exemplo de resposta
  res.status(201).json({ message: "Dados recebidos com sucesso!", data: {email, senha} });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
