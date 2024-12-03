import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginBackground,
  LoginButton,
  FormBackground,
  LoginTitle,
} from "./login-styles";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errosEmail, setErrosEmail] = useState("");
  const [errosSenha, setErrosSenha] = useState("");
  const [loginErrado, setLoginErrado] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validouEmail = validarEmail(email);
    let validouSenha = validarSenha(senha);

    if (validouEmail === true && validouSenha === true) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
        const res = await fetch(`${apiUrl}/usuario/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
          credentials: "include",
        });

        const data = await res.json();

        if (res.status === 200 && data.success && data.user.status === true) {
          console.log("Login validado.");
          const expiresIn = 24 * 60 * 60 * 1000;
          const expirationDate = new Date().getTime() + expiresIn;

          const userData = {
            user: data.user,
            expiresAt: expirationDate,
          };

          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("isLoggedIn", "true");
          navigate("/menu");
          setLoginErrado(false);
        } else {
          setLoginErrado(true);
        }
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
        setLoginErrado(true);
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const validarEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || !emailPattern.test(email)) {
      setErrosEmail("Email inválido");
      return false;
    } else {
      setErrosEmail("");
      return true;
    }
  };

  const validarSenha = (senha) => {
    if (senha === "") {
      setErrosSenha("Senha não pode ser nula");
      return false;
    } else {
      setErrosSenha("");
      return true;
    }
  };

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleInputSenha = (event) => {
    setSenha(event.target.value);
  };

  return (
    <>
      <LoginBackground>
        <FormBackground>
          <form action="" onSubmit={handleSubmit}>
            <LoginTitle>Faça seu login</LoginTitle>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                placeholder="Informe seu email"
                onChange={handleInputEmail}
                className="form-control rounded w-20"
              ></input>
              {errosEmail && (
                <span className="text-danger"> {errosEmail} </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="Informe sua senha"
                onChange={handleInputSenha}
                className="form-control rounded w-20"
              ></input>
              {errosSenha && (
                <span className="text-danger"> {errosSenha} </span>
              )}
            </div>
            <div className="mb-3">
              {loginErrado && (
                <span className="text-danger">Login inválido</span>
              )}
            </div>
            <LoginButton type="submit" className="btn btn-success bg-black">
              Entrar
            </LoginButton>
          </form>
          <button
            onClick={handleRegisterRedirect}
            className="btn btn-link w-100 mt-3"
          >
            Não tem uma conta? Registre-se
          </button>
        </FormBackground>
      </LoginBackground>
    </>
  );
}

export default Login;
