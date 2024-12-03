import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import {
  PageWrapper,
  FormContainer,
  FormHeader,
  FormGroup,
  SubmitButton,
  CancelButton,
  ErrorText,
} from './edit-transport-styles';
import apiService from '../../../services/apiService';

function EditTransport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    motorista_id: "",
    veiculo_id: "",
    data_transporte: "",
    horario_saida: "",
    horario_retorno: "",
    status: "",
    pacientes: [],
  });

  const [errors, setErrors] = useState({});
  const [motoristas, setMotoristas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState({
    paciente_id: "",
    local_destino: "",
    observacoes: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          transporteData,
          motoristasData,
          veiculosData,
          pacientesData
        ] = await Promise.all([
          apiService.getTransportById(id),
          apiService.getDrivers(),
          apiService.getVehicles(),
          apiService.getPatients()
        ]);

        const date = new Date(transporteData.data_transporte);
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
          .toISOString()
          .split('T')[0];

        setFormData({
          motorista_id: transporteData.motorista_id,
          veiculo_id: transporteData.veiculo_id,
          data_transporte: localDate,
          horario_saida: transporteData.horario_saida,
          horario_retorno: transporteData.horario_retorno || '',
          status: transporteData.status,
          pacientes: transporteData.pacientes || [],
        });

        setMotoristas(motoristasData);
        setVeiculos(veiculosData);
        setPacientes(pacientesData);
      } catch (err) {
        setErrors({ fetch: err.message || "Erro ao carregar dados" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.motorista_id)
      newErrors.motorista_id = "Motorista é obrigatório";
    if (!formData.veiculo_id)
      newErrors.veiculo_id = "Veículo é obrigatório";
    if (!formData.data_transporte)
      newErrors.data_transporte = "Data é obrigatória";
    if (!formData.horario_saida)
      newErrors.horario_saida = "Horário de saída é obrigatório";
    if (formData.pacientes.length === 0)
      newErrors.pacientes = "Adicione pelo menos um paciente";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPaciente = () => {
    if (!selectedPaciente.paciente_id || !selectedPaciente.local_destino) {
      setErrors((prev) => ({
        ...prev,
        pacienteAdd: "Selecione o paciente e informe o destino",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      pacientes: [...prev.pacientes, { ...selectedPaciente }],
    }));

    setSelectedPaciente({
      paciente_id: "",
      local_destino: "",
      observacoes: "",
    });

    setErrors((prev) => ({ ...prev, pacienteAdd: null }));
  };

  const handleRemovePaciente = (index) => {
    setFormData((prev) => ({
      ...prev,
      pacientes: prev.pacientes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await apiService.updateTransport(id, formData);
      navigate("/transport");
    } catch (error) {
      setErrors({ submit: error.message || "Erro ao atualizar transporte" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePacienteChange = (e) => {
    const { name, value } = e.target;
    setSelectedPaciente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <PageWrapper>
      <Navbar />
      <FormContainer>
        <FormHeader>
          <h2>Editar Transporte</h2>
        </FormHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="motorista_id">Motorista*</label>
            <select
              id="motorista_id"
              name="motorista_id"
              value={formData.motorista_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um motorista</option>
              {motoristas.map(motorista => (
                <option key={motorista.id} value={motorista.id}>
                  {motorista.nome}
                </option>
              ))}
            </select>
            {errors.motorista_id && <ErrorText>{errors.motorista_id}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="veiculo_id">Veículo*</label>
            <select
              id="veiculo_id"
              name="veiculo_id"
              value={formData.veiculo_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um veículo</option>
              {veiculos.map((veiculo) => (
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.modelo} - {veiculo.placa}
                </option>
              ))}
            </select>
            {errors.veiculo_id && <ErrorText>{errors.veiculo_id}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="data_transporte">Data*</label>
            <input
              type="date"
              id="data_transporte"
              name="data_transporte"
              value={formData.data_transporte}
              onChange={handleChange}
              required
            />
            {errors.data_transporte && (
              <ErrorText>{errors.data_transporte}</ErrorText>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="horario_saida">Horário de Saída*</label>
            <input
              type="time"
              id="horario_saida"
              name="horario_saida"
              value={formData.horario_saida}
              onChange={handleChange}
              required
            />
            {errors.horario_saida && (
              <ErrorText>{errors.horario_saida}</ErrorText>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="horario_retorno">Horário de Retorno</label>
            <input
              type="time"
              id="horario_retorno"
              name="horario_retorno"
              value={formData.horario_retorno}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="agendado">Agendado</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </FormGroup>

          <FormGroup>
            <h3>Adicionar Pacientes</h3>
            <div>
              <select
                name="paciente_id"
                value={selectedPaciente.paciente_id}
                onChange={handlePacienteChange}
              >
                <option value="">Selecione um paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nome}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="local_destino"
                placeholder="Local de destino"
                value={selectedPaciente.local_destino}
                onChange={handlePacienteChange}
              />

              <input
                type="text"
                name="observacoes"
                placeholder="Observações"
                value={selectedPaciente.observacoes}
                onChange={handlePacienteChange}
              />

              <button type="button" onClick={handleAddPaciente}>
                Adicionar Paciente
              </button>
            </div>
            {errors.pacienteAdd && <ErrorText>{errors.pacienteAdd}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <h4>Pacientes Adicionados:</h4>
            {formData.pacientes.map((paciente, index) => (
              <div key={index}>
                <span>
                  {pacientes.find((p) => p.id === paciente.paciente_id)?.nome} -
                  {paciente.local_destino}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemovePaciente(index)}
                >
                  Remover
                </button>
              </div>
            ))}
            {errors.pacientes && <ErrorText>{errors.pacientes}</ErrorText>}
          </FormGroup>

          {errors.submit && <ErrorText>{errors.submit}</ErrorText>}

          <SubmitButton type="submit">Salvar</SubmitButton>
          <CancelButton type="button" onClick={() => navigate("/transport")}>
            Cancelar
          </CancelButton>
        </form>
      </FormContainer>
    </PageWrapper>
  );
}

export default EditTransport; 