import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import { 
  FormWrapper, 
  FormHeader, 
  FormSection, 
  FormGroup, 
  ButtonGroup 
} from './novo-styles';

function Novo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    data_nascimento: ''
  });
  const [errors, setErrors] = useState({});

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
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!/^\d{11}$/.test(formData.cpf)) {
      newErrors.cpf = 'CPF deve conter 11 dígitos';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const cleanedData = {
      ...formData,
      data_nascimento: formData.data_nascimento || null,
      email: formData.email || null,
      telefone: formData.telefone || null
    };

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/pacientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/patients');
      } else {
        setErrors(prev => ({
          ...prev,
          submit: data.message
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Erro ao criar paciente'
      }));
    }
  };

  const handleCancel = () => {
    navigate('/patients');
  };

  return (
    <>
      <Navbar />
      <FormWrapper>
        <FormHeader>
          <h2>Novo Paciente</h2>
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
          </FormSection>
          <FormSection>
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
              {errors.telefone && <p className="error-message">{errors.telefone}</p>}
            </FormGroup>
          </FormSection>
          <FormSection>
            <FormGroup>
              <label htmlFor="data_nascimento">Data de Nascimento</label>
              <input
                type="date"
                id="data_nascimento"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
              />
              {errors.data_nascimento && <p className="error-message">{errors.data_nascimento}</p>}
            </FormGroup>
          </FormSection>
          <ButtonGroup>
            <button type="submit" className="save">Salvar</button>
            <button type="button" className="cancel" onClick={handleCancel}>Cancelar</button>
          </ButtonGroup>
        </form>
      </FormWrapper>
    </>
  );
}

export default Novo; 