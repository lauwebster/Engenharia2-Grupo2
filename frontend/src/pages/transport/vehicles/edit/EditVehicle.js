import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../../components/navbar/navbar";
import Footer from "../../../../components/footer/footer";
import {
  PageWrapper,
  FormContainer,
  FormHeader,
  FormGroup,
  SubmitButton,
  CancelButton,
  ErrorText,
} from "./edit-vehicle-styles";
import apiService from "../../../../services/apiService";

function EditVehicle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    placa: "",
    modelo: "",
    capacidade: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicle = await apiService.getVehicleById(id);
        setFormData({
          placa: vehicle.placa,
          modelo: vehicle.modelo,
          capacidade: vehicle.capacidade,
          status: vehicle.status,
        });
      } catch (error) {
        setErrors({ fetch: error.message || "Erro ao carregar veículo" });
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.placa) {
      newErrors.placa = "Placa é obrigatória";
    } else {
      const placaRegex = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/;
      if (!placaRegex.test(formData.placa.replace('-', ''))) {
        newErrors.placa = "Placa deve estar no formato Mercosul (ABC1D23)";
      }
    }

    if (!formData.modelo) {
      newErrors.modelo = "Modelo é obrigatório";
    }

    if (!formData.capacidade) {
      newErrors.capacidade = "Capacidade é obrigatória";
    } else if (isNaN(formData.capacidade) || Number(formData.capacidade) <= 0) {
      newErrors.capacidade = "Capacidade deve ser um número positivo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await apiService.updateVehicle(id, formData);
      navigate("/transport/vehicles");
    } catch (error) {
      setErrors({ submit: error.message || "Erro ao atualizar veículo" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "placa") {
      formattedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <PageWrapper>
      <Navbar />
      <FormContainer>
        <FormHeader>
          <h2>Editar Veículo</h2>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="placa">Placa*</label>
            <input
              type="text"
              id="placa"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              maxLength="7"
              placeholder="ABC1D23"
            />
            {errors.placa && <ErrorText>{errors.placa}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="modelo">Modelo*</label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              placeholder="Ex: Fiat Ducato"
            />
            {errors.modelo && <ErrorText>{errors.modelo}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="capacidade">Capacidade de Passageiros*</label>
            <input
              type="number"
              id="capacidade"
              name="capacidade"
              value={formData.capacidade}
              onChange={handleChange}
              min="1"
              placeholder="Ex: 15"
            />
            {errors.capacidade && <ErrorText>{errors.capacidade}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="disponivel">Disponível</option>
              <option value="em_uso">Em Uso</option>
              <option value="manutencao">Manutenção</option>
            </select>
          </FormGroup>

          {errors.submit && <ErrorText>{errors.submit}</ErrorText>}

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <SubmitButton type="submit">Salvar Alterações</SubmitButton>
            <CancelButton type="button" onClick={() => navigate("/transport/vehicles")}>
              Cancelar
            </CancelButton>
          </div>
        </form>
      </FormContainer>
      <Footer />
    </PageWrapper>
  );
}

export default EditVehicle; 