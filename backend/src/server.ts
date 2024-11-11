import "dotenv/config";
import express from "express";
import routes from "./routes/UsuarioRotas";
import { DateTime } from "luxon";

DateTime.local().setZone("America/Sao_Paulo");
const app = require('./app');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use("/usuarios", routes);