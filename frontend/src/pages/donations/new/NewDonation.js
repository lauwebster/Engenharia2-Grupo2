import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import {
  PageWrapper,
  FormContainer,
  FormHeader,
  FormGroup,
  SubmitButton,
  CancelButton,
  ErrorText
} from './new-donation-styles';

function NewDonation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data_doacao: '',
    valor: '',
    observacoes: ''
  });
  const [errors, setErrors] = useState({});
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
        const response = await fetch(`${apiUrl}/pacientes`, {
          credentials: "include",
        });
        const data = await response.json();
        
        if (data.success) {
          setPatients(data.pacientes);
        } else {
          setErrors(prev => ({
            ...prev,
            submit: 'Erro ao carregar lista de pacientes'
          }));
        }
      } catch (err) {
        setErrors(prev => ({
          ...prev,
          submit: 'Erro ao conectar com o servidor'
        }));
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.paciente_id) {
      newErrors.paciente_id = 'ID do Paciente é obrigatório';
    }

    if (!formData.data_doacao) {
      newErrors.data_doacao = 'Data da doação é obrigatória';
    }

    if (!formData.valor) {
      newErrors.valor = 'Valor é obrigatório';
    } else if (isNaN(formData.valor) || Number(formData.valor) <= 0) {
      newErrors.valor = 'Valor deve ser um número positivo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/doacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        navigate('/donations');
      } else {
        setErrors({ submit: data.message || 'Erro ao criar doação' });
      }
    } catch (error) {
      setErrors({ submit: 'Erro ao conectar com o servidor' });
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <FormContainer>
        <FormHeader>
          <h2>Nova Doação</h2>
        </FormHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="paciente_id">Paciente*</label>
            <select
              id="paciente_id"
              name="paciente_id"
              value={formData.paciente_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um paciente</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.nome}
                </option>
              ))}
            </select>
            {errors.paciente_id && <ErrorText>{errors.paciente_id}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="data_doacao">Data da Doação*</label>
            <input
              type="date"
              id="data_doacao"
              name="data_doacao"
              value={formData.data_doacao}
              onChange={handleChange}
              required
            />
            {errors.data_doacao && <ErrorText>{errors.data_doacao}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="valor">Valor*</label>
            <input
              type="number"
              id="valor"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
            />
            {errors.valor && <ErrorText>{errors.valor}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
            />
          </FormGroup>

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <SubmitButton type="submit">Salvar</SubmitButton>
            <CancelButton type="button" onClick={() => navigate('/donations')}>
              Cancelar
            </CancelButton>
          </div>
        </form>
      </FormContainer>
      <Footer />
    </PageWrapper>
  );
}

export default NewDonation; 