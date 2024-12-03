import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import apiService from "../../../services/apiService";
import { PageWrapper } from "../consultations-styles";
import {
  ContentWrapper,
  Container,
  Title,
  ConsultationsList,
  ConsultationCard,
  EmptyMessage,
  AlertMessage
} from './pending-consultations-styles';

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

const MainContent = styled.div`
  flex: 1;
`;

function PendingConsultations() {
  const [pendingConsultations, setPendingConsultations] = useState([]);
  const [error, setError] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchPendingConsultations();
  }, []);

  const fetchPendingConsultations = async () => {
    try {
      const response = await apiService.getPendingConsultations();
      setPendingConsultations(response.consultas);
    } catch (err) {
      setError(err.message || "Erro ao carregar consultas pendentes");
    }
  };

  const handleUpdateConsultation = async (consultationId, updateData) => {
    try {
      await apiService.updateConsultation(consultationId, updateData);
      fetchPendingConsultations();
    } catch (err) {
      setError(err.message || "Erro ao atualizar consulta");
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <ContentWrapper>
          <Container>
            <Title>Consultas Pendentes</Title>
            {error && <AlertMessage variant="danger">{error}</AlertMessage>}
            
            {pendingConsultations.length === 0 ? (
              <EmptyMessage>Não há consultas pendentes para finalizar.</EmptyMessage>
            ) : (
              <ConsultationsList>
                {pendingConsultations.map((consultation) => (
                  <ConsultationCard key={consultation.id}>
                    <div className="consultation-info">
                      <h5>{consultation.paciente_nome}</h5>
                      <p>Data: {new Date(consultation.data_consulta).toLocaleDateString()}</p>
                      <p>Horário: {consultation.horario}</p>
                      <p>Instituição: {consultation.instituicao_nome}</p>
                    </div>
                    <div className="consultation-actions">
                      <Button
                        variant="success"
                        onClick={() => {
                          setSelectedConsultation(consultation);
                          setShowUpdateModal(true);
                        }}
                      >
                        Finalizar
                      </Button>
                    </div>
                  </ConsultationCard>
                ))}
              </ConsultationsList>
            )}
          </Container>
        </ContentWrapper>
      </MainContent>
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

export default PendingConsultations; 