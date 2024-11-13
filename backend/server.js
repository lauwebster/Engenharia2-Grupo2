const express = require("express");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/siscarim/", userRoutes); // Prefixa as rotas de usuários com "/api/users"

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
