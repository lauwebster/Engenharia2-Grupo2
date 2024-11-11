export interface UsuarioIn {
  id: number;
  email: string;
  nome: string;
  senha: string;
  status: number;
  permissao: number;
}

export interface UsuarioOut {
  id: number;
  email: string;
  nome: string;
  senha: string;
  status: number;
  permissao: number;
}