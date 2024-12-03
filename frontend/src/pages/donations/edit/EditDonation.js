import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import {
  PageWrapper,
  FormContainer,
  FormHeader,
  FormGroup,
  SubmitButton,
  CancelButton,
  ErrorText,
} from "../new/new-donation-styles";
import apiService from '../../../services/apiService';

function EditDonation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    paciente_id: '',
    data_doacao: '',
    valor: '',
    observacoes: '',
    status: 'pendente'
  });
  const [errors, setErrors] = useState({});
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donation, patientsData] = await Promise.all([
          apiService.getDonation(id),
          apiService.getPatients()
        ]);

        const date = new Date(donation.data_doacao);
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
          .toISOString()
          .split('T')[0];

        setFormData({
          paciente_id: donation.paciente_id,
          data_doacao: localDate,
          valor: donation.valor,
          observacoes: donation.observacoes || '',
          status: donation.status
        });
        setPatients(patientsData);
      } catch (error) {
        setErrors({ submit: error.message || 'Erro ao carregar dados' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.paciente_id) {
      newErrors.paciente_id = 'Paciente é obrigatório';
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
      await apiService.updateDonation(id, formData);
      navigate('/donations');
    } catch (error) {
      setErrors({ submit: error.message || 'Erro ao atualizar doação' });
    }
  };

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

  const handleCancel = () => {
    navigate('/donations');
  };

  return (
    <PageWrapper>
      <Navbar />
      <PageWrapper>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <FormContainer>
            <FormHeader>Editar Doação</FormHeader>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="paciente_id">Paciente</label>
                <select
                  id="paciente_id"
                  name="paciente_id"
                  value={formData.paciente_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um paciente</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.nome}</option>
                  ))}
                </select>
                {errors.paciente_id && <ErrorText>{errors.paciente_id}</ErrorText>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="data_doacao">Data da Doação</label>
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
                <label htmlFor="valor">Valor</label>
                <input
                  type="number"
                  id="valor"
                  name="valor"
                  value={formData.valor}
                  onChange={handleChange}
                  required
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
              <FormGroup>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pendente">Pendente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                  <option value="repassado">Repassado</option>
                </select>
                {errors.status && <ErrorText>{errors.status}</ErrorText>}
              </FormGroup>
              <SubmitButton type="submit">Salvar</SubmitButton>
              <CancelButton type="button" onClick={handleCancel}>Cancelar</CancelButton>
            </form>
          </FormContainer>
        )}
      </PageWrapper>
      <Footer />
    </PageWrapper>
  );
}

export default EditDonation; 