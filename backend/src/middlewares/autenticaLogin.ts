import { error } from "console";
import { NextFunction } from "express";
import { Request, Response } from "express";
import UsuarioModel from "../models/UsuarioModel";

const usuarioModel = new UsuarioModel();

export const autenticaLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const senha = req.body.senha;

    const usuario = await usuarioModel.validaLogin(email);
    if (!usuario) {
      return res.status(401).send({
        message: "Login não autorizado.",
      });
    }
    req.body.id_usuario = usuario.id;
    next();

  } catch (error) {
    res.status(401).send({
      message: "Erro ao efetuar login",
    });
  }
};