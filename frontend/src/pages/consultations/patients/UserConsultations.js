import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import {
  PageWrapper,
  ConsultationsContainer,
  ConsultationCard,
  Title,
  BackButton,
  AddButton,
} from "./user-consultations-styles";
import apiService from "../../../services/apiService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UpdateConsultationModal = ({
  show,
  handleClose,
  consultation,
  onUpdate,
}) => {
  const [observacoes, setObservacoes] = useState(consultation?.observacoes || '');
  const [status, setStatus] = useState('realizada');
  const [error, setError] = useState('');

  const VALID_STATUS = ['realizada', 'nao_compareceu', 'cancelada'];

  const handleSubmit = async () => {
    try {
      if (!VALID_STATUS.includes(status)) {
        setError('Status inválido');
        return;
      }

      await onUpdate(consultation.id, {
        status,
        observacoes
      });
      handleClose();
    } catch (err) {
      setError(err.message || 'Erro ao atualizar consulta');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Finalizar Consulta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="form-group mb-3">
          <label>Status</label>
          <select 
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="realizada">Realizada</option>
            <option value="nao_compareceu">Não Compareceu</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div className="form-group">
          <label>Observações</label>
          <textarea
            className="form-control"
            rows="3"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Adicione observações sobre a consulta"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function UserConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const { userId } = useParams();
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const fetchUserConsultations = async () => {
      try {
        setLoading(true);
        const [consultationsData, patientData] = await Promise.all([
          apiService.getUserConsultations(userId),
          apiService.getPatientDetails(userId),
        ]);

        setConsultations(consultationsData);
        setPatient(patientData);
      } catch (err) {
        setError(err.message || "Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchUserConsultations();
  }, [userId]);

  const getStatusColor = (status) => {
    const colors = {
      agendada: "#ffd700",
      realizada: "#90EE90",
      nao_compareceu: "#FFB6C1",
      cancelada: "#D3D3D3",
    };
    return colors[status] || "#D3D3D3";
  };

  const getStatusText = (status) => {
    const texts = {
      agendada: "Agendada",
      realizada: "Realizada",
      nao_compareceu: "Não Compareceu",
      cancelada: "Cancelada",
    };
    return texts[status] || status;
  };

  const handleUpdateConsultation = async (consultationId, updateData) => {
    try {
      await apiService.updateConsultation(consultationId, updateData);
      
      const updatedConsultations = await apiService.getUserConsultations(userId);
      setConsultations(updatedConsultations);
    } catch (err) {
      console.error('Error updating consultation:', err);
      setError(err.message || 'Erro ao atualizar consulta');
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <ConsultationsContainer>
        <BackButton to="/consultations">
          ← Voltar para lista de pacientes
        </BackButton>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title>
            Consultas do Paciente <i>{patient?.nome}</i>
          </Title>
          <AddButton to={`/consultations/${userId}/novo`}>
            Nova Consulta
          </AddButton>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <p>Carregando consultas...</p>
        ) : consultations.length === 0 ? (
          <p>Nenhuma consulta encontrada para este paciente.</p>
        ) : (
          consultations.map((consultation) => (
            <ConsultationCard key={consultation.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>{consultation.instituicao_nome}</h4>
                <div>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      backgroundColor: getStatusColor(consultation.status),
                      color: "#000",
                      marginRight: "10px",
                    }}
                  >
                    {getStatusText(consultation.status)}
                  </span>
                  {consultation.status === "agendada" && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedConsultation(consultation);
                        setShowUpdateModal(true);
                      }}
                    >
                      Finalizar Consulta
                    </Button>
                  )}
                </div>
              </div>
              <p>
                Data:{" "}
                {new Date(consultation.data_consulta).toLocaleDateString()}
              </p>
              <p>Horário: {consultation.horario}</p>
              {consultation.observacoes && (
                <p>Observações: {consultation.observacoes}</p>
              )}
            </ConsultationCard>
          ))
        )}
      </ConsultationsContainer>
      <Footer />
      <UpdateConsultationModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        consultation={selectedConsultation}
        onUpdate={handleUpdateConsultation}
      />
    </PageWrapper>
  );
}

export default UserConsultations;
