import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../components/navbar/navbar";
import Footer from "../../../../components/footer/footer";
import apiService from "../../../../services/apiService";
import {
  PageWrapper,
  MainContent,
  Container,
  Title,
  FormGroup,
  ErrorText,
  SubmitButton,
  CancelButton,
} from "./new-sector-styles";

function NewSetor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    responsavel_id: "",
    status: "ativo",
  });
  const [errors, setErrors] = useState({});
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await apiService.getPatients();
        setUsuarios(response || []);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome do setor é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await apiService.createSetor(formData);
      navigate("/sectors");
    } catch (error) {
      console.error("Erro ao criar setor:", error);
      setErrors((prev) => ({
        ...prev,
        submit: error.response?.data?.message || "Erro ao criar setor",
      }));
    }
  };

  const handleCancel = () => {
    navigate("/sectors");
  };

  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <Container>
          <Title>Novo Setor</Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="nome">Nome do Setor*</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="form-control"
              />
              {errors.nome && <ErrorText>{errors.nome}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="form-control"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="responsavel_id">Responsável</label>
              <select
                id="responsavel_id"
                name="responsavel_id"
                value={formData.responsavel_id}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Selecione um responsável</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nome}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </FormGroup>

            {errors.submit && <ErrorText>{errors.submit}</ErrorText>}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <SubmitButton type="submit">Salvar Setor</SubmitButton>
              <CancelButton type="button" onClick={handleCancel}>
                Cancelar
              </CancelButton>
            </div>
          </form>
        </Container>
      </MainContent>
      <Footer />
    </PageWrapper>
  );
}

export default NewSetor;
