import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import {
  PageWrapper,
  NewExpenseWrapper,
  FormContainer,
  FormHeader,
  FormGroup,
  SubmitButton,
  CancelButton,
  ErrorText,
} from "../new/new-expense-styles";
import apiService from '../../../services/apiService';

function EditExpense() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    descricao: '',
    data_despesa: '',
    valor: '',
    tipo: '',
    status: 'pendente'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDespesa = async () => {
      try {
        const despesa = await apiService.getExpense(id);
        const date = new Date(despesa.data_despesa);
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
          .toISOString()
          .split('T')[0];
        
        setFormData({
          descricao: despesa.descricao,
          data_despesa: localDate,
          valor: despesa.valor,
          tipo: despesa.tipo,
          status: despesa.status
        });
      } catch (error) {
        setErrors({ submit: error.message || 'Erro ao carregar despesa' });
      } finally {
        setLoading(false);
      }
    };

    fetchDespesa();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.descricao) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.data_despesa) {
      newErrors.data_despesa = 'Data da despesa é obrigatória';
    }

    if (!formData.tipo) {
      newErrors.tipo = 'Tipo é obrigatório';
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
      await apiService.updateExpense(id, formData);
      navigate('/expenses');
    } catch (error) {
      setErrors({ submit: error.message || 'Erro ao atualizar despesa' });
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
    navigate('/expenses');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <PageWrapper>
      <Navbar />
      <NewExpenseWrapper>
        <FormContainer>
          <FormHeader>
            <h2>Editar Despesa</h2>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="descricao">Descrição*</label>
              <input
                type="text"
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />
              {errors.descricao && <ErrorText>{errors.descricao}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="data_despesa">Data da Despesa*</label>
              <input
                type="date"
                id="data_despesa"
                name="data_despesa"
                value={formData.data_despesa}
                onChange={handleChange}
              />
              {errors.data_despesa && <ErrorText>{errors.data_despesa}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="tipo">Tipo*</label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
              >
                <option value="">Selecione um tipo</option>
                <option value="fixa">Fixa</option>
                <option value="variavel">Variável</option>
              </select>
              {errors.tipo && <ErrorText>{errors.tipo}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="valor">Valor*</label>
              <input
                type="number"
                id="valor"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                step="0.01"
              />
              {errors.valor && <ErrorText>{errors.valor}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pendente">Pendente</option>
                <option value="paga">Paga</option>
                <option value="cancelada">Cancelada</option>
              </select>
              {errors.status && <ErrorText>{errors.status}</ErrorText>}
            </FormGroup>

            {errors.submit && <ErrorText>{errors.submit}</ErrorText>}
            <div>
              <SubmitButton type="submit">Salvar</SubmitButton>
              <CancelButton type="button" onClick={handleCancel}>Cancelar</CancelButton>
            </div>
          </form>
        </FormContainer>
      </NewExpenseWrapper>
      <Footer />
    </PageWrapper>
  );
}

export default EditExpense; 