import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Button } from "react-bootstrap";
import {
  PatientsBody,
  ContentWrapper,
  Header,
  SearchSection,
  PatientsList,
  PatientItem,
  PatientId,
  PatientName,
  ActionIcons,
} from "./patients-styles";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";

function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const pacientes = await apiService.getPatients();
        setPatients(pacientes);
        setFilteredPatients(pacientes);
      } catch (err) {
        setError(err.message || "Erro ao carregar pacientes");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);
  const handleNewPatient = () => {
    navigate("/patients/novo");
  };

  const handleDeletePatient = async (patientId) => {
    if (window.confirm("Tem certeza que deseja excluir este paciente?")) {
      try {
        const response = await apiService.deletePatient(patientId);
        if (response.success) {
          setPatients(patients.filter((patient) => patient.id !== patientId));
          setFilteredPatients(
            filteredPatients.filter((patient) => patient.id !== patientId)
          );
        } else {
          setError(response.message || "Erro ao excluir paciente");
        }
      } catch (err) {
        setError("Erro ao excluir paciente");
      }
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      setFilteredPatients(patients);
      return;
    }
    const filteredPatients = patients.filter((patient) =>
      patient.nome.toLowerCase().includes(searchTerm)
    );
    setFilteredPatients(filteredPatients);
  };

  return (
    <PatientsBody>
      <Navbar />

      <ContentWrapper>
        <Header>
          <h2>gerenciar pacientes</h2>
          <Button
            variant="primary"
            className="new-patient-btn"
            onClick={handleNewPatient}
          >
            NOVO PACIENTE
          </Button>
        </Header>

        <SearchSection>
          <input
            type="text"
            placeholder="Buscar paciente..."
            onChange={handleSearch}
          />
        </SearchSection>

        <PatientsList>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p>Erro: {error}</p>
          ) : filteredPatients.length === 0 ? (
            <p>Nenhum paciente encontrado</p>
          ) : (
            filteredPatients.map((patient) => (
              <PatientItem key={patient.id}>
                <PatientId>{String(patient.id).padStart(3, "0")}</PatientId>
                <PatientName>{patient.nome}</PatientName>
                <ActionIcons>
                  <Button variant="link" className="icon">
                    👁️
                  </Button>
                  <Button
                    variant="link"
                    className="icon"
                    onClick={() => navigate(`/patients/edit/${patient.id}`)}
                  >
                    ✏️
                  </Button>{" "}
                  <Button
                    variant="link"
                    className="icon"
                    onClick={() => handleDeletePatient(patient.id)}
                  >
                    🗑️
                  </Button>
                </ActionIcons>
              </PatientItem>
            ))
          )}
        </PatientsList>
      </ContentWrapper>

      <Footer />
    </PatientsBody>
  );
}

export default Patients;
