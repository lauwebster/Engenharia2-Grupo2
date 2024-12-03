import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RegisterContainer,
  FormWrapper,
  FormTitle,
  FormGroup,
  Label,
  Input,
  ErrorText,
  SubmitButton
} from "./register-styles";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
      const res = await fetch(`${apiUrl}/usuario/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, senha }),
      });

      if (res.status === 201) {
        console.log("Usuário cadastrado com sucesso.");
        navigate("/");
      } else {
        const data = await res.json();
        setErrors({ apiError: data.message || "Erro ao registrar" });
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setErrors({ apiError: "Um erro aconteceu ao registrar" });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = "Nome de usuário é obrigatório";
    if (!email) errors.email = "Email é obrigatório";
    if (!senha) errors.senha = "Password é obrigatório";
    return errors;
  };

  return (
    <>
      <RegisterContainer>
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <FormTitle>Registrar uma nova conta</FormTitle>
            <FormGroup>
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <ErrorText>{errors.username}</ErrorText>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="senha">Senha</Label>
              <Input
                type="password"
                name="senha"
                placeholder="Senha"
                onChange={(e) => setSenha(e.target.value)}
              />
              {errors.senha && <ErrorText>{errors.senha}</ErrorText>}
            </FormGroup>
            {errors.apiError && <ErrorText>{errors.apiError}</ErrorText>}
            <SubmitButton type="submit">Cadastrar</SubmitButton>
          </form>
          <button onClick={() => navigate("/")}>Voltar para o login</button>
        </FormWrapper>
      </RegisterContainer>
    </>
  );
}

export default Register; 