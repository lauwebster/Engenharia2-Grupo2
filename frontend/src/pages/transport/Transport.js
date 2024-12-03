import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import {
  TransportBody,
  TransportHeader,
  TransportContainer,
  TransportCard,
  EmptyState,
  ErrorMessage
} from "./transport-styles";
import apiService from '../../services/apiService';

function Transport() {
  const navigate = useNavigate();
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const transportes = await apiService.getTransports();
        setTransports(transportes);
      } catch (err) {
        setError(err.message || "Erro ao conectar com o servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchTransports();
  }, []);

  const handleNewTransport = () => {
    navigate("/transport/new");
  };

  const handleDeleteTransport = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este transporte?")) {
      return;
    }
    try {
      await apiService.deleteTransport(id);
      setTransports(transports.filter((transport) => transport.id !== id));
    } catch (err) {
      setError(err.message || "Erro ao deletar transporte");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <TransportBody>
        <TransportHeader>
          <h1>Transportes</h1>
          <button onClick={handleNewTransport}>Novo Transporte</button>
        </TransportHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <TransportContainer>
          {loading ? (
            <p>Carregando transportes...</p>
          ) : transports.length === 0 ? (
            <EmptyState>
              <h3>Nenhum transporte encontrado</h3>
              <p>Clique em "Novo Transporte" para adicionar um transporte</p>
            </EmptyState>
          ) : (
            transports.map((transport) => (
              <TransportCard key={transport.id}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <h4>Transporte #{String(transport.id).padStart(3, "0")}</h4>
                  <div>
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        marginRight: "10px"
                      }}
                      onClick={() => navigate(`/transport/edit/${transport.id}`)}
                      title="Editar transporte"
                    >
                      ✏️
                    </span>
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        color: "#ff4444"
                      }}
                      onClick={() => handleDeleteTransport(transport.id)}
                      title="Deletar transporte"
                    >
                      🗑️
                    </span>
                  </div>
                </div>
                <p><strong>Motorista:</strong> {transport.motorista_nome}</p>
                <p><strong>Data:</strong> {new Date(transport.data_transporte).toLocaleDateString('pt-BR')}</p>
                <p><strong>Horário:</strong> {transport.horario_saida} - {transport.horario_retorno || 'Não definido'}</p>
                <p><strong>Veículo:</strong> {transport.veiculo_modelo} ({transport.veiculo_placa})</p>
                {transport.pacientes_nomes && <p><strong>Pacientes:</strong> {transport.pacientes_nomes}</p>}
                {transport.destinos && <p><strong>Destinos:</strong> {transport.destinos}</p>}
                <p><strong>Status:</strong> {transport.status}</p>
              </TransportCard>
            ))
          )}
        </TransportContainer>
      </TransportBody>
      <Footer />
    </div>
  );
}

export default Transport; 