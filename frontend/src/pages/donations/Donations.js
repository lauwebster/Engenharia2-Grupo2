import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import {
  DonationsBody,
  DonationsHeader,
  DonationsContainer,
  DonationCard,
  ErrorMessage,
  EmptyState,
} from "./donations-styles";
import apiService from "../../services/apiService";

function Donations() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [patients, setPatients] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientes, doacoes] = await Promise.all([
          apiService.getPatients(),
          apiService.getDonations(),
        ]);

        const patientsMap = {};
        pacientes.forEach((patient) => {
          patientsMap[patient.id] = patient.nome;
        });
        setPatients(patientsMap);
        setDonations(doacoes || []);
      } catch (err) {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNewDonation = () => {
    navigate("/donations/new");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleDeleteDonation = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar esta doação?")) {
      return;
    }

    try {
      await apiService.deleteDonation(id);
      setDonations(donations.filter((donation) => donation.id !== id));
    } catch (err) {
      setError(err.message || "Erro ao deletar doação");
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <DonationsBody>
        <DonationsHeader>
          <h1>Doações</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleNewDonation}>Nova Doação</button>
          </div>
        </DonationsHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <DonationsContainer>
          {loading ? (
            <p>Carregando doações...</p>
          ) : donations.length === 0 ? (
            <EmptyState>
              <h3>Nenhuma doação encontrada</h3>
              <p>Clique em "Nova Doação" para adicionar uma doação</p>
            </EmptyState>
          ) : (
            donations.map((donation) => (
              <DonationCard key={donation.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <h4>Doação #{String(donation.id).padStart(3, "0")}</h4>
                    <button
                      onClick={() => navigate(`/donations/edit/${donation.id}`)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                      title="Editar doação"
                    >
                      ✏️
                    </button>
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        color: "#ff4444",
                        transition: "color 0.2s",
                      }}
                      onClick={() => handleDeleteDonation(donation.id)}
                      title="Deletar doação"
                    >
                      🗑️
                    </span>
                  </div>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      backgroundColor:
                        donation.status === "pendente" ? "#ffd700" :
                        donation.status === "confirmada" ? "#90EE90" :
                        donation.status === "repassado" ? "#87CEEB" :
                        "#dc3545",
                      color: donation.status === "pendente" ? "#000" : "#fff"
                    }}
                  >
                    {donation.status}
                  </span>
                </div>
                <p>
                  <strong>Paciente:</strong>{" "}
                  {patients[donation.paciente_id] || "Nome não encontrado"}
                </p>
                <p>
                  Data: {new Date(donation.data_doacao).toLocaleDateString()}
                </p>
                <p>Valor: {formatCurrency(donation.valor)}</p>
                {donation.observacoes && (
                  <p>Observações: {donation.observacoes}</p>
                )}
              </DonationCard>
            ))
          )}
        </DonationsContainer>
      </DonationsBody>
      <Footer />
    </div>
  );
}

export default Donations;
