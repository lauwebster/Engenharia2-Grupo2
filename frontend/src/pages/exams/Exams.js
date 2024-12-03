import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { ExamsContainer, UserSelect, Title, PageWrapper } from "./exams-styles";
import Footer from "../../components/footer/footer";

function Exams() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/pacientes`, {
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          setUsers(data.pacientes);
        } else {
          setError("Erro ao carregar pacientes");
        }
      } catch (err) {
        setError("Erro ao conectar com o servidor");
      }
    };

    fetchUsers();
  }, [apiUrl]);

  const handleUserSelect = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);
    if (userId) {
      navigate(`/exams/${userId}`);
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <ExamsContainer>
        <Title>Exames</Title>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <UserSelect value={selectedUser} onChange={handleUserSelect}>
          <option value="">Selecione um paciente</option>
          {Array.isArray(users) &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nome}
              </option>
            ))}
        </UserSelect>
      </ExamsContainer>
      <Footer />
    </PageWrapper>
  );
}

export default Exams;
