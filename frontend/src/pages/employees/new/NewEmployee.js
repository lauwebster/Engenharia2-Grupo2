import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import apiService from "../../../services/apiService";
import {
  FormWrapper,
  FormHeader,
  FormSection,
  FormGroup,
  ButtonGroup,
} from "../form-styles";

function NewEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    data_nascimento: "",
    data_admissao: "",
    cargo: "",
    salario: "",
    setor_id: "",
    status: "ativo",
  });
  const [errors, setErrors] = useState({});
  const [setores, setSetores] = useState([]);

  useEffect(() => {
    const fetchSetores = async () => {
      try {
        const response = await apiService.getSetores();
        setSetores(response || []);
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
      }
    };

    fetchSetores();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.cpf.trim()) newErrors.cpf = "CPF é obrigatório";
    if (formData.cpf && !/^\d{11}$/.test(formData.cpf)) {
      newErrors.cpf = "CPF deve conter 11 dígitos";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.cargo.trim()) newErrors.cargo = "Cargo é obrigatório";
    if (!formData.salario) newErrors.salario = "Salário é obrigatório";

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
      await apiService.createFuncionario(formData);
      navigate("/employees");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.response?.data?.message || "Erro ao criar funcionário",
      }));
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <FormWrapper>
        <FormHeader>
          <h2>Novo Funcionário</h2>
        </FormHeader>
        <form onSubmit={handleSubmit}>
          <FormSection>
            <FormGroup>
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
              {errors.nome && <p className="error-message">{errors.nome}</p>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
              />
              {errors.cpf && <p className="error-message">{errors.cpf}</p>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
              {errors.telefone && (
                <p className="error-message">{errors.telefone}</p>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="data_nascimento">Data de Nascimento</label>
              <input
                type="date"
                id="data_nascimento"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
              />
              {errors.data_nascimento && (
                <p className="error-message">{errors.data_nascimento}</p>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="data_admissao">Data de Admissão</label>
              <input
                type="date"
                id="data_admissao"
                name="data_admissao"
                value={formData.data_admissao}
                onChange={handleChange}
              />
              {errors.data_admissao && (
                <p className="error-message">{errors.data_admissao}</p>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="cargo">Cargo</label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
              />
              {errors.cargo && <p className="error-message">{errors.cargo}</p>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="salario">Salário</label>
              <input
                type="number"
                id="salario"
                name="salario"
                value={formData.salario}
                onChange={handleChange}
              />
              {errors.salario && (
                <p className="error-message">{errors.salario}</p>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="setor_id">Setor</label>
              <select
                id="setor_id"
                name="setor_id"
                value={formData.setor_id}
                onChange={handleChange}
              >
                <option value="">Selecione o setor</option>
                {setores.map((setor) => (
                  <option key={setor.id} value={setor.id}>
                    {setor.nome}
                  </option>
                ))}
              </select>
              {errors.setor_id && (
                <p className="error-message">{errors.setor_id}</p>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
              {errors.status && (
                <p className="error-message">{errors.status}</p>
              )}
            </FormGroup>
            <ButtonGroup>
              <button type="submit" className="submit">
                Salvar
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => navigate("/employees")}
              >
                Cancelar
              </button>
            </ButtonGroup>
          </FormSection>
        </form>
      </FormWrapper>
      <Footer />
    </div>
  );
}

export default NewEmployee;
