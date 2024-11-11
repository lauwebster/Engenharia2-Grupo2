import { Request, Response } from "express";
import UsuarioModel from "../models/UsuarioModel";
import { UsuarioIn, UsuarioOut } from "../dtos/UsuarioDTO";

const usuarioModel = new UsuarioModel();

export default class UsuarioController {

  create = async (req: Request, res: Response) => {
    try {
      const userEmail = req.body.email;

      let verificaEmailExiste = await usuarioModel.verificaEmailExiste(userEmail);
      if (verificaEmailExiste) {
        if (verificaEmailExiste.email != null)
          return res.status(400).json({
            message: "E-mail já cadastrado."
          })
      }
    } catch (e) {
      console.log("Falha ao criar usuário.", e);
      res.status(500).send({
        error: "USR-01",
        message: "Falha ao criar usuário.",
      });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const user = await usuarioModel.get(Number(req.params.id));
      if (user) res.status(200).json(user);

      else {
        res.status(401).json({
          error: "USR-07",
          message: "Usuário não encontrado.",
        });
      }
    } catch (e) {
      console.log("Falha ao buscar usuário.", e);
      res.status(500).send({
        error: "USR-02",
        message: "Falha ao buscar usuário.",
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      let id = req.body.id;
      const users: UsuarioOut[] | null = await usuarioModel.getAll(id);
      res.status(200).json(users);
    } catch (e) {
      console.log("Falha ao buscar usuários.", e);
      res.status(500).send({
        error: "USR-03",
        message: "Falha ao buscar usuários.",
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      const updateUser: UsuarioIn = req.body;
      const userUpdated: UsuarioOut | null = await usuarioModel.update(
        id,
        updateUser
      );
      if (userUpdated) {
        res.status(200).json(userUpdated);
      } else {
        res.status(404).json({
          error: "USR-06",
          message: "Usuário não encontrado.",
        });
      }
    } catch (e) {
      console.log("Falha ao atualizar usuário.", e);
      res.status(500).send({
        error: "USR-04",
        message: "Falha ao atualizar usuário.",
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      const userDeleted = await usuarioModel.delete(id);
      res.status(204).json(userDeleted);
    } catch (e) {
      console.log("Falha ao deletar usuário.", e);
      res.status(500).send({
        error: "USR-05",
        message: "Falha ao deletar usuário.",
      });
    }
  };

  login = async (req: Request, res: Response) => {

    const {email, senha} = req.body;
    const usuario = await usuarioModel.verificaEmailExiste(email);

    if (!usuario) {
      res.status(404).send({
        error: "Senha e/ou email inválido.",
      });
    } else {
      res.status(200).json(usuario);
    }
  };

  getEmail = async (req: Request, res: Response) => {
    try {
      const emailDigitado = req.body.email;
      const usuario = await usuarioModel.verificaEmailExiste(emailDigitado);

      if (usuario) {
        res.status(404).json("E-mail inválido.");
      }
      else {
        res.status(200).json("");
      }
    } catch (e) {
      res.status(500).send({
        message: "Falha ao validar E-mail.",
      });
    }
  };
}