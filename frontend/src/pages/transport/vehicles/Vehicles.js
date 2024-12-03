import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import {
  VehiclesBody,
  VehiclesHeader,
  VehiclesContainer,
  VehicleCard,
  EmptyState,
  ErrorMessage
} from "./vehicles-styles";
import apiService from "../../../services/apiService";

function Vehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const veiculos = await apiService.getVehicles();
        setVehicles(veiculos);
      } catch (err) {
        setError(err.message || "Erro ao conectar com o servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleNewVehicle = () => {
    navigate("/transport/vehicles/new");
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este veículo?")) {
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/veiculos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
      } else {
        setError("Erro ao deletar veículo");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <VehiclesBody>
        <VehiclesHeader>
          <h1>Veículos</h1>
          <button onClick={handleNewVehicle}>Novo Veículo</button>
        </VehiclesHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <VehiclesContainer>
          {loading ? (
            <p>Carregando veículos...</p>
          ) : vehicles.length === 0 ? (
            <EmptyState>
              <h3>Nenhum veículo encontrado</h3>
              <p>Clique em "Novo Veículo" para adicionar um veículo</p>
            </EmptyState>
          ) : (
            vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <h4>Veículo #{String(vehicle.id).padStart(3, "0")}</h4>
                  <div>
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        marginRight: "10px"
                      }}
                      onClick={() => navigate(`/transport/vehicles/edit/${vehicle.id}`)}
                      title="Editar veículo"
                    >
                      ✏️
                    </span>
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        color: "#ff4444"
                      }}
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      title="Deletar veículo"
                    >
                      🗑️
                    </span>
                  </div>
                </div>
                <p><strong>Placa:</strong> {vehicle.placa}</p>
                <p>Modelo: {vehicle.modelo}</p>
                <p>Capacidade: {vehicle.capacidade} lugares</p>
                <p>Status: {vehicle.status}</p>
              </VehicleCard>
            ))
          )}
        </VehiclesContainer>
      </VehiclesBody>
      <Footer />
    </div>
  );
}

export default Vehicles; 