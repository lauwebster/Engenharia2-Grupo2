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
} from './new-exam-styles';
import apiService from '../../../../services/apiService';

function NewExam() {
  const [examTypes, setExamTypes] = useState([]);
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    tipo_exame_id: '',
    data_exame: '',
    resultado: '',
    status: 'pendente'
  });
  const [error, setError] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
  const [isNewExamType, setIsNewExamType] = useState(false);
  const [newExamTypeData, setNewExamTypeData] = useState({
    nome: '',
    descricao: '',
    valor: ''
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`${apiUrl}/pacientes/${userId}`, {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (response.ok) {
          setPatient(data.paciente);
        } else {
          setError('Erro ao carregar dados do paciente');
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor');
      }
    };

    const fetchExamTypes = async () => {
      try {
        const response = await fetch(`${apiUrl}/tipo-exame`, {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (response.ok) {
          setExamTypes(data.tiposExame);
        } else {
          setError('Erro ao carregar tipos de exame');
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor');
      }
    };

    fetchPatient();
    fetchExamTypes();
  }, [apiUrl, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!formData.tipo_exame_id || !formData.data_exame) {
        setError('Tipo de exame e data são obrigatórios');
        return;
      }

      const response = await fetch(`${apiUrl}/exame`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          paciente_id: userId,
          status: 'pendente'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/exams/${userId}`);
      } else {
        setError(data.message || 'Erro ao criar exame');
      }
    } catch (err) {
      console.error('Error creating exam:', err);
      setError('Erro ao conectar com o servidor');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewExamTypeSubmit = async () => {
    try {
      const newExamType = await apiService.createExamType(newExamTypeData);
      
      setFormData(prev => ({
        ...prev,
        tipo_exame_id: newExamType.id
      }));
      
      setExamTypes(prev => [...prev, newExamType]);
      
      setIsNewExamType(false);
      setNewExamTypeData({
        nome: '',
        descricao: '',
        valor: ''
      });
    } catch (err) {
      console.error('Error creating exam type:', err);
      setError(err.message || 'Erro ao conectar com o servidor');
    } finally {
      setIsNewExamType(false);
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <FormContainer>
        <BackButton to={`/exams/${userId}`}>← Voltar</BackButton>
        <Title>Novo Exame</Title>
        
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
            <label htmlFor="tipo_exame_id">Tipo de Exame*</label>
            {!isNewExamType ? (
              <>
                <select
                  id="tipo_exame_id"
                  name="tipo_exame_id"
                  value={formData.tipo_exame_id}
                  onChange={handleChange}
                  required={!isNewExamType}
                  className="form-control"
                >
                  <option value="">Selecione um tipo</option>
                  {examTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.nome}
                    </option>
                  ))}
                </select>
                <button 
                  type="button" 
                  className="btn btn-link"
                  onClick={() => setIsNewExamType(true)}
                >
                  + Adicionar novo tipo de exame
                </button>
              </>
            ) : (
              <div className="new-exam-type-form">
                <FormGroup>
                  <label htmlFor="new-exam-type-nome">Nome do Novo Tipo*</label>
                  <input
                    type="text"
                    id="new-exam-type-nome"
                    value={newExamTypeData.nome}
                    onChange={(e) => setNewExamTypeData(prev => ({
                      ...prev,
                      nome: e.target.value
                    }))}
                    className="form-control"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="new-exam-type-descricao">Descrição</label>
                  <textarea
                    id="new-exam-type-descricao"
                    value={newExamTypeData.descricao}
                    onChange={(e) => setNewExamTypeData(prev => ({
                      ...prev,
                      descricao: e.target.value
                    }))}
                    className="form-control"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="new-exam-type-valor-ref">Valor de Referência</label>
                  <input
                    type="text"
                    id="new-exam-type-valor-ref"
                    value={newExamTypeData.valor}
                    onChange={(e) => setNewExamTypeData(prev => ({
                      ...prev,
                      valor: e.target.value
                    }))}
                    className="form-control"
                  />
                </FormGroup>

                <div className="button-group">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleNewExamTypeSubmit}
                  >
                    Salvar Novo Tipo
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsNewExamType(false);
                      setNewExamTypeData({
                        nome: '',
                        descricao: '',
                        valor: ''
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
            <label htmlFor="data_exame">Data do Exame*</label>
            <input
              type="date"
              id="data_exame"
              name="data_exame"
              value={formData.data_exame}
              onChange={handleChange}
              required
              className="form-control"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="resultado">Resultado</label>
            <input
              type="text"
              id="resultado"
              name="resultado"
              value={formData.resultado}
              onChange={handleChange}
              className="form-control"
              placeholder="Resultado do exame"
            />
          </FormGroup>

          <SubmitButton type="submit">Salvar Exame</SubmitButton>
        </StyledForm>
      </FormContainer>
      <Footer />
    </PageWrapper>
  );
}

export default NewExam; 