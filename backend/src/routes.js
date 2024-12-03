import express from "express";

import instituicoesRoutes from "./routes/instituicoesRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import pacientesRoutes from "./routes/pacientesRoutes.js";
import doacaoRoutes from "./routes/doacaoRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";
import despesaRoutes from "./routes/despesaRoutes.js";
import caixaRoutes from "./routes/caixaRoutes.js";
import tipoExameRoutes from "./routes/tipoExameRoutes.js";
import exameRoutes from "./routes/exameRoutes.js";
import veiculosRoutes from "./routes/veiculosRoutes.js";
import transporteRoutes from "./routes/transporteRoutes.js";
import motoristaRoutes from "./routes/motoristaRoutes.js";
import setorRoutes from "./routes/setorRoutes.js";
import funcionarioRoutes from "./routes/funcionarioRoutes.js";
import parametrizacaoRoutes from "./routes/parametrizacaoRoutes.js";

const mountRoutes = (app) => {
  app.use("/instituicoes", instituicoesRoutes);
  app.use("/usuario", usuarioRoutes);
  app.use("/pacientes", pacientesRoutes);
  app.use("/doacoes", doacaoRoutes);
  app.use("/consulta", consultaRoutes);
  app.use("/despesa", despesaRoutes);
  app.use("/caixa", caixaRoutes);
  app.use("/tipo-exame", tipoExameRoutes);
  app.use("/exame", exameRoutes);
  app.use("/veiculos", veiculosRoutes);
  app.use("/transporte", transporteRoutes);
  app.use("/motorista", motoristaRoutes);
  app.use("/setor", setorRoutes);
  app.use("/funcionarios", funcionarioRoutes);
  app.use("/parametrizacao", parametrizacaoRoutes);
};

export default mountRoutes;
