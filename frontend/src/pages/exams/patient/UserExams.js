import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import {
  PageWrapper,
  ExamsContainer,
  ExamCard,
  BackButton,
  Title,
  AddButton,
} from "./user-exams-styles";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ExamsPDF from '../../../components/ExamsPDF';
import { Modal, Button } from 'react-bootstrap';

const UpdateExamModal = ({
  show,
  handleClose,
  exam,
  onUpdate,
}) => {
  const [resultado, setResultado] = useState(exam?.resultado || '');
  const [status] = useState('realizado');
  const [error, setError] = useState('');

  const VALID_STATUS = ['pendente', 'realizado', 'cancelado'];

  const handleSubmit = async () => {
    try {
      if (!VALID_STATUS.includes(status)) {
        setError('Status inválido');
        return;
      }

      await onUpdate(exam.id, {
        resultado,
      });
      handleClose();
    } catch (err) {
      setError(err.message || 'Erro ao atualizar exame');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Atualizar Exame</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="form-group">
          <label>Resultado</label>
          <textarea
            className="form-control"
            rows="3"
            value={resultado}
            onChange={(e) => setResultado(e.target.value)}
            placeholder="Resultado do exame"
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

function UserExams() {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const { userId } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
  const [selectedExam, setSelectedExam] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const fetchUserExams = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/exame/paciente/${userId}`, {
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          setExams(data.exames);
          try {
            const response = await fetch(`${apiUrl}/pacientes/${userId}`, {
              credentials: "include",
            });
            const data = await response.json();
            setPatient(data.paciente);
          } catch (err) {}
        } else {
          setError("Erro ao carregar exames");
        }
      } catch (err) {
        setError("Erro ao conectar com o servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchUserExams();
  }, [userId, apiUrl]);

  const handleExportPDF = async () => {
    try {
      await fetch(`${apiUrl}/exame/batch-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ids: exams.map(exam => exam.id),
          status: 'retirado'
        })
      });

      const response = await fetch(`${apiUrl}/exame/paciente/${userId}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setExams(data.exames);
      }
    } catch (err) {
      console.error('Error updating exams status:', err);
      setError('Erro ao atualizar status dos exames');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pendente: "#ffd700",
      realizado: "#90EE90",
      retirado: "#87CEEB",
      cancelado: "#D3D3D3"
    };
    return colors[status] || "#D3D3D3";
  };

  const getStatusText = (status) => {
    const texts = {
      pendente: "Pendente",
      realizado: "Realizado",
      retirado: "Retirado",
      cancelado: "Cancelado"
    };
    return texts[status] || status;
  };

  const handleUpdateExam = async (examId, updateData) => {
    try {
      const response = await fetch(`${apiUrl}/exame/${examId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar exame');
      }

      const updatedResponse = await fetch(`${apiUrl}/exame/paciente/${userId}`, {
        credentials: "include",
      });
      const data = await updatedResponse.json();
      if (updatedResponse.ok) {
        setExams(data.exames);
      }
    } catch (err) {
      console.error('Error updating exam:', err);
      setError('Erro ao atualizar exame');
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <ExamsContainer>

        <BackButton to="/exams">
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
          <Title>Exames do Paciente <i>{patient?.nome}</i></Title>
          <div style={{ display: 'flex', gap: '10px' }}>
            <AddButton to={`/exams/${userId}/novo`}>Novo Exame</AddButton>
            {exams.length > 0 && (
              <PDFDownloadLink
                document={<ExamsPDF exams={exams} patient={patient} />}
                fileName={`exames_${patient?.nome || 'paciente'}.pdf`}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onClick={handleExportPDF}
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Gerando PDF...' : 'Exportar PDF'
                }
              </PDFDownloadLink>
            )}
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <p>Carregando exames...</p>
        ) : exams.length === 0 ? (
          <p>Nenhum exame encontrado para este paciente.</p>
        ) : (
          exams.map((exam) => (
            <ExamCard key={exam.id}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}>
                <div>
                  <h4>{exam.tipo}</h4>
                  <p>Data: {new Date(exam.data_exame).toLocaleDateString()}</p>
                  <p>Resultado: {exam.resultado || "Não informado"}</p>
                  {exam.observacoes && <p>Observações: {exam.observacoes}</p>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    backgroundColor: getStatusColor(exam.status),
                    color: "#000",
                    fontSize: "0.9rem",
                    fontWeight: "500"
                  }}>
                    {getStatusText(exam.status)}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedExam(exam);
                      setShowUpdateModal(true);
                    }}
                  >
                    Atualizar Exame
                  </Button>
                </div>
              </div>
            </ExamCard>
          ))
        )}
      </ExamsContainer>
      <Footer />
      <UpdateExamModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        exam={selectedExam}
        onUpdate={handleUpdateExam}
      />
    </PageWrapper>
  );
}

export default UserExams;
