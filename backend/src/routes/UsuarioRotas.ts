import Router from "express";
import UsuarioController from "../controllers/usuarioController";

const routes = Router();
const usuarioController = new UsuarioController();

routes.post("/login", usuarioController.login);

export default routes;