import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import {
  ConsultationsContainer,
  UserSelect,
  Title,
  PageWrapper,
} from "./consultations-styles";
import Footer from "../../components/footer/footer";
import apiService from "../../services/apiService";
import {
  ButtonGroup,
  StyledButton,
  AlertMessage
} from './consultations-styles';

function Consultations() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function fetchUsers() {
    try {
      const patients = await apiService.getPatients();
      setUsers(patients);
    } catch (err) {
      setError(err.message || "Erro ao carregar pacientes");
    }
  }

  const handleUserSelect = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);
    if (userId) {
      navigate(`/consultations/${userId}`);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <PageWrapper>
      <Navbar />
      <ConsultationsContainer>
        <Title>Consultas</Title>

        <ButtonGroup>
          <StyledButton onClick={() => navigate("/consultations/pending")}>
            Consultas Pendentes
          </StyledButton>
        </ButtonGroup>

        {error && <AlertMessage variant="danger">{error}</AlertMessage>}

        <UserSelect value={selectedUser} onChange={handleUserSelect}>
          <option value="">Selecione um paciente</option>
          {Array.isArray(users) &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nome}
              </option>
            ))}
        </UserSelect>
      </ConsultationsContainer>
      <Footer />
    </PageWrapper>
  );
}

export default Consultations;
