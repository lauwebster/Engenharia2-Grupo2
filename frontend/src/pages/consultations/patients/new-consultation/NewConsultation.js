import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/navbar/navbar';
import Footer from '../../../../components/footer/footer';
import {
  PageWrapper,
  FormContainer,
  FormGroup,
  StyledForm,
  SubmitButton,
  BackButton,
  Title,
  PatientInfo
} from './new-consultation-styles';
import apiService from '../../../../services/apiService';

function NewConsultation() {
  const [institutions, setInstitutions] = useState([]);
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    instituicao_id: '',
    data_consulta: '',
    horario: '',
    observacoes: '',
    status: 'agendada'
  });
  const [error, setError] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
  const [isNewInstitution, setIsNewInstitution] = useState(false);
  const [newInstitutionData, setNewInstitutionData] = useState({
    nome: '',
    endereco: '',
    telefone: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientData, institutionsData] = await Promise.all([
          apiService.getPatientDetails(userId),
          apiService.getInstitutions()
        ]);
        
        setPatient(patientData);
        setInstitutions(institutionsData);
      } catch (err) {
        setError(err.message || "Erro ao carregar dados");
      }
    };
  
    fetchData();
  }, [userId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.instituicao_id || !formData.data_consulta || !formData.horario) {
        setError('Instituição, data e horário são obrigatórios');
        return;
      }
      await apiService.createConsultation({
        ...formData,
        paciente_id: userId,
        status: 'agendada'
      });
      navigate(`/consultations/${userId}`);
    } catch (err) {
      setError(err.message || 'Erro ao criar consulta');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewInstitutionSubmit = async () => {
    try {
      if (!newInstitutionData.nome) {
        setError('Nome da instituição é obrigatório');
        return;
      }

      const response = await fetch(`${apiUrl}/instituicoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newInstitutionData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData(prev => ({
          ...prev,
          instituicao_id: data.instituicao.id
        }));
        
        setInstitutions(prev => [...prev, data.instituicao]);
        
        setIsNewInstitution(false);
        setNewInstitutionData({
          nome: '',
          endereco: '',
          telefone: ''
        });
      } else {
        setError(data.message || 'Erro ao criar instituição');
      }
    } catch (err) {
      console.error('Error creating institution:', err);
      setError('Erro ao conectar com o servidor [handleNewInstitutionSubmit]');
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <FormContainer>
        <BackButton to={`/consultations/${userId}`}>← Voltar</BackButton>
        <Title>Nova Consulta</Title>
        
        {patient && (
          <PatientInfo>
            <h3>Paciente: {patient.nome}</h3>
            <p>CPF: {patient.cpf}</p>
            {patient.data_nascimento && (
              <p>Data de Nascimento: {new Date(patient.data_nascimento).toLocaleDateString()}</p>
            )}
          </PatientInfo>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="instituicao_id">Instituição*</label>
            {!isNewInstitution ? (
              <>
                <select
                  id="instituicao_id"
                  name="instituicao_id"
                  value={formData.instituicao_id}
                  onChange={handleChange}
                  required={!isNewInstitution}
                  className="form-control"
                >
                  <option value="">Selecione uma instituição</option>
                  {institutions.map(inst => (
                    <option key={inst.id} value={inst.id}>
                      {inst.nome}
                    </option>
                  ))}
                </select>
                <button 
                  type="button" 
                  className="btn btn-link"
                  onClick={() => setIsNewInstitution(true)}
                >
                  + Adicionar nova instituição
                </button>
              </>
            ) : (
              <div className="new-institution-form">
                <FormGroup>
                  <label htmlFor="new-institution-nome">Nome da Nova Instituição*</label>
                  <input
                    type="text"
                    id="new-institution-nome"
                    value={newInstitutionData.nome}
                    onChange={(e) => setNewInstitutionData(prev => ({
                      ...prev,
                      nome: e.target.value
                    }))}
                    className="form-control"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="new-institution-endereco">Endereço</label>
                  <input
                    type="text"
                    id="new-institution-endereco"
                    value={newInstitutionData.endereco}
                    onChange={(e) => setNewInstitutionData(prev => ({
                      ...prev,
                      endereco: e.target.value
                    }))}
                    className="form-control"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="new-institution-telefone">Telefone</label>
                  <input
                    type="text"
                    id="new-institution-telefone"
                    value={newInstitutionData.telefone}
                    onChange={(e) => setNewInstitutionData(prev => ({
                      ...prev,
                      telefone: e.target.value
                    }))}
                    className="form-control"
                  />
                </FormGroup>

                <div className="button-group">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleNewInstitutionSubmit}
                  >
                    Salvar Nova Instituição
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsNewInstitution(false);
                      setNewInstitutionData({
                        nome: '',
                        endereco: '',
                        telefone: ''
                      });
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="data_consulta">Data da Consulta*</label>
            <input
              type="date"
              id="data_consulta"
              name="data_consulta"
              value={formData.data_consulta}
              onChange={handleChange}
              required
              className="form-control"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="horario">Horário*</label>
            <input
              type="time"
              id="horario"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              required
              className="form-control"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Observações sobre a consulta"
            />
          </FormGroup>

          <SubmitButton type="submit">Agendar Consulta</SubmitButton>
        </StyledForm>
      </FormContainer>
      <Footer />
    </PageWrapper>
  );
}

export default NewConsultation; 