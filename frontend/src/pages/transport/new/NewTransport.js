import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import {
  PageWrapper,
  FormContainer,
  FormHeader,
  FormGroup,
  SubmitButton,
  CancelButton,
  ErrorText,
} from './new-transport-styles';

function NewTransport() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    motorista_id: "",
    veiculo_id: "",
    data_transporte: "",
    horario_saida: "",
    horario_retorno: "",
    status: "agendado",
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

  const [isNewMotorista, setIsNewMotorista] = useState(false);
  const [newMotoristaData, setNewMotoristaData] = useState({
    nome: "",
    cnh: "",
    validade_cnh: "",
    telefone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

        // Fetch motoristas
        const motoristasResponse = await fetch(`${apiUrl}/motorista`);
        const motoristasData = await motoristasResponse.json();
        if (motoristasData.success) {
          setMotoristas(motoristasData.motoristas);
        }

        // Fetch veículos
        const veiculosResponse = await fetch(`${apiUrl}/veiculos`);
        const veiculosData = await veiculosResponse.json();
        if (veiculosData.success) {
          setVeiculos(veiculosData.veiculos);
        }

        // Fetch pacientes
        const pacientesResponse = await fetch(`${apiUrl}/pacientes`);
        const pacientesData = await pacientesResponse.json();
        if (pacientesData.success) {
          setPacientes(pacientesData.pacientes);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setErrors((prev) => ({
          ...prev,
          fetch: "Erro ao carregar dados",
        }));
      }
    };

    fetchData();
  }, []);

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

  const handleNewMotoristaSubmit = async () => {
    try {
      if (!newMotoristaData.nome || !newMotoristaData.cnh || !newMotoristaData.validade_cnh) {
        setErrors((prev) => ({
          ...prev,
          motoristaAdd: "Nome, CNH e Validade da CNH são obrigatórios",
        }));
        return;
      }

      const cnhRegex = /^\d{11}$/;
      if (!cnhRegex.test(newMotoristaData.cnh)) {
        setErrors((prev) => ({
          ...prev,
          motoristaAdd: "CNH deve conter 11 dígitos numéricos",
        }));
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/motorista`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newMotoristaData),
      });

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          motorista_id: data.motorista.id,
        }));

        setMotoristas((prev) => [...prev, data.motorista]);

        setIsNewMotorista(false);
        setNewMotoristaData({
          nome: "",
          cnh: "",
          validade_cnh: "",
          telefone: "",
        });
      } else {
        setErrors((prev) => ({
          ...prev,
          motoristaAdd: data.message || "Erro ao criar motorista",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors((prev) => ({
        ...prev,
        motoristaAdd: "Erro ao conectar com o servidor",
      }));
    }
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
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

      const transporteResponse = await fetch(`${apiUrl}/transporte`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motorista_id: formData.motorista_id,
          veiculo_id: formData.veiculo_id,
          data_transporte: formData.data_transporte,
          horario_saida: formData.horario_saida,
          horario_retorno: formData.horario_retorno,
          status: formData.status,
          pacientes: formData.pacientes
        }),
      });

      const transporteData = await transporteResponse.json();

      if (transporteData.success) {
        navigate("/transport");
      } else {
        setErrors({
          submit: transporteData.message || "Erro ao criar transporte",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "Erro ao conectar com o servidor" });
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

  return (
    <PageWrapper>
      <Navbar />
      <FormContainer>
        <FormHeader>
          <h2>Novo Transporte</h2>
        </FormHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="motorista_id">Motorista*</label>
            {!isNewMotorista ? (
              <>
                <select
                  id="motorista_id"
                  name="motorista_id"
                  value={formData.motorista_id}
                  onChange={handleChange}
                  required={!isNewMotorista}
                >
                  <option value="">Selecione um motorista</option>
                  {motoristas.map(motorista => (
                    <option key={motorista.id} value={motorista.id}>{motorista.nome}</option>
                  ))}
                </select>
                <button 
                  type="button" 
                  className="btn btn-link"
                  onClick={() => setIsNewMotorista(true)}
                >
                  + Adicionar novo motorista
                </button>
              </>
            ) : (
              <div className="new-motorista-form">
                <FormGroup>
                  <label htmlFor="new-motorista-nome">Nome do Motorista*</label>
                  <input
                    type="text"
                    id="new-motorista-nome"
                    value={newMotoristaData.nome}
                    onChange={(e) => setNewMotoristaData(prev => ({
                      ...prev,
                      nome: e.target.value
                    }))}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="new-motorista-cnh">CNH*</label>
                  <input
                    type="text"
                    id="new-motorista-cnh"
                    value={newMotoristaData.cnh}
                    onChange={(e) => setNewMotoristaData(prev => ({
                      ...prev,
                      cnh: e.target.value
                    }))}
                    required
                    maxLength="11"
                    placeholder="Digite os 11 dígitos da CNH"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="new-motorista-validade-cnh">Validade da CNH*</label>
                  <input
                    type="date"
                    id="new-motorista-validade-cnh"
                    value={newMotoristaData.validade_cnh}
                    onChange={(e) => setNewMotoristaData(prev => ({
                      ...prev,
                      validade_cnh: e.target.value
                    }))}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="new-motorista-telefone">Telefone</label>
                  <input
                    type="text"
                    id="new-motorista-telefone"
                    value={newMotoristaData.telefone}
                    onChange={(e) => setNewMotoristaData(prev => ({
                      ...prev,
                      telefone: e.target.value
                    }))}
                  />
                </FormGroup>

                <div className="button-group">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleNewMotoristaSubmit}
                  >
                    Salvar Motorista
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsNewMotorista(false);
                      setNewMotoristaData({
                        nome: '',
                        cnh: '',
                        validade_cnh: '',
                        telefone: ''
                      });
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
            {errors.motorista_id && <ErrorText>{errors.motorista_id}</ErrorText>}
            {errors.motoristaAdd && <ErrorText>{errors.motoristaAdd}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="veiculo_id">Veículo*</label>
            <select
              id="veiculo_id"
              name="veiculo_id"
              value={formData.veiculo_id}
              onChange={handleChange}
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

export default NewTransport; 