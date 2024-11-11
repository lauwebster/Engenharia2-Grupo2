import { PrismaClient} from "@prisma/client";
import { UsuarioIn } from "../dtos/UsuarioDTO";

const prisma = new PrismaClient();

export default class UsuarioModel {
  create = async (usuario: UsuarioIn) => {
    return await prisma.usuario.create({
      data: {
        email: 'cassiaperego@unoeste.edu.br',
        senha: '123',
        nome: 'Cássia Perego',
        status: 1,
        permissao: 1,
      },
    });
  };

  getAll = async (id: number) => {
    return await prisma.usuario.findMany({
      where: {
        id,
      },
    });
  };

  get = async (id: number) => {
    return await prisma.usuario.findUnique({
      where: {
        id: id,
      },
    });
  };

  delete = async (id: number) => {
    return await prisma.usuario.delete({
      where: {
        id,
      },
    });
  };

  update = async (id: number, user: UsuarioIn) => {
    return await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    });
  };

  validaLogin = async (email: string) => {
    return prisma.usuario.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        senha: true,
        id: true,
      },
    });
  };

  verificaEmailExiste = async (email: string) => {
    return prisma.usuario.findFirst({
      where: {
        email: email
      },
      select: {
        email: true
      }
    })
  };
}
