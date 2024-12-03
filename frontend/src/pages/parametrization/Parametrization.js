import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import parametrizationService from "../../services/parametrizationService";
import {
  FormContainer,
  FormGroup,
  FormHeader,
  ErrorText,
  Button,
  LogoPreview,
} from "./parametrization-styles";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import authService from "../../services/authService";

function Parametrization() {
  const navigate = useNavigate();
  const isAdmin = authService.isAdmin();
  const readOnly = !isAdmin;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    sigla: "",
    endereco: "",
    telefone: "",
    email: "",
    logo_url: "",
    descricao: "",
    created_at: null,
    updated_at: null,
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    checkParametrization();
  }, []);

  const checkParametrization = async () => {
    try {
      const params = await parametrizationService.getParametrization();

      if (params && typeof params === "object") {
        const formattedData = {
          id: params.id ?? null,
          nome: params.nome ?? "",
          sigla: params.sigla ?? "",
          endereco: params.endereco ?? "",
          telefone: params.telefone ?? "",
          email: params.email ?? "",
          logo_url: params.logo_url ?? "",
          descricao: params.descricao ?? "",
          created_at: params.created_at ?? null,
          updated_at: params.updated_at ?? null,
        };

        setFormData(formattedData);
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Erro ao verificar parametrização:", error);
      setErrors({ submit: "Erro ao carregar parametrização" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome da organização é obrigatório";
    }
    if (!formData.sigla.trim()) {
      newErrors.sigla = "Sigla é obrigatória";
    }
    if (!formData.endereco.trim()) {
      newErrors.endereco = "Endereço é obrigatório";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        created_at: formData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        await parametrizationService.updateParametrization(payload);
      } else {
        await parametrizationService.createParametrization(payload);
      }
      navigate("/");
    } catch (error) {
      setErrors({ submit: error.message || "Erro ao salvar parametrização" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleLogoChange = (e) => {
    const { name, value } = e.target;
    if (name === "logo_url") {
      try {
        new URL(value);
        setFormData((prev) => ({
          ...prev,
          logo_url: value,
        }));
        if (errors.logo_url) {
          setErrors((prev) => ({
            ...prev,
            logo_url: "",
          }));
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          logo_url: "URL inválida",
        }));
      }
    }
  };

  return (
    <>
      <Navbar />
      <FormContainer>
        <FormHeader>
          <h2>
            {isEditing
              ? `${
                  readOnly ? "Visualizar" : "Editar"
                } Informações da Organização`
              : "Configuração Inicial da Organização"}
          </h2>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="nome">Nome da Organização*</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              disabled={readOnly}
            />
            {errors.nome && <ErrorText>{errors.nome}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="sigla">Sigla*</label>
            <input
              type="text"
              id="sigla"
              name="sigla"
              value={formData.sigla}
              onChange={handleChange}
              disabled={readOnly}
            />
            {errors.sigla && <ErrorText>{errors.sigla}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="endereco">Endereço*</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              disabled={readOnly}
            />
            {errors.endereco && <ErrorText>{errors.endereco}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              disabled={readOnly}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={readOnly}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="logo_url">URL do Logotipo</label>
            <input
              type="url"
              id="logo_url"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleLogoChange}
              placeholder="https://exemplo.com/logo.png"
              disabled={readOnly}
            />

            {errors.logo_url && <ErrorText>{errors.logo_url}</ErrorText>}
            {formData.logo_url && (
              <LogoPreview>
                <img
                  src={formData.logo_url}
                  alt="Logo preview"
                  onError={(e) => {
                    e.target.onerror = null;
                    setErrors((prev) => ({
                      ...prev,
                      logo_url: "Não foi possível carregar a imagem",
                    }));
                  }}
                />
              </LogoPreview>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="4"
              disabled={readOnly}
            />
          </FormGroup>

          {errors.submit && <ErrorText>{errors.submit}</ErrorText>}

          {!readOnly && (
            <Button type="submit">{isEditing ? "Atualizar" : "Salvar"}</Button>
          )}
        </form>
      </FormContainer>
      <Footer />
    </>
  );
}

export default Parametrization;
