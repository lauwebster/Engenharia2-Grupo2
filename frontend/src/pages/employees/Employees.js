import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import apiService from "../../services/apiService";
import {
  PageContainer,
  EmployeesBody,
  EmployeesHeader,
  EmployeeCard,
  StatusBadge,
  AddEmployeeButton,
  ActionButtonsContainer,
  ActionButton,
} from "./employees-styles";

function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiService.getFuncionarios();
        setEmployees(response);
      } catch (err) {
        setError(err.message || "Erro ao carregar os funcionários");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleNewEmployee = () => {
    navigate("/employees/new");
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      try {
        await apiService.deleteFuncionario(id);
        setEmployees(employees.filter((emp) => emp.id !== id));
      } catch (err) {
        setError("Erro ao excluir o funcionário");
      }
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <PageContainer>
      <Navbar />
      <EmployeesBody>
        <EmployeesHeader>
          <h1>Funcionários</h1>
          <AddEmployeeButton onClick={handleNewEmployee}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Novo Funcionário
          </AddEmployeeButton>
        </EmployeesHeader>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <p>Carregando funcionários...</p>
        ) : employees.length === 0 ? (
          <p>Nenhum funcionário encontrado.</p>
        ) : (
          employees.map((employee) => (
            <EmployeeCard key={employee.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>{employee.nome}</h4>
                <StatusBadge status={employee.status}>
                  {employee.status}
                </StatusBadge>
              </div>
              <p>
                <strong>CPF:</strong> {employee.cpf}
              </p>
              <p>
                <strong>Cargo:</strong> {employee.cargo}
              </p>
              <p>
                <strong>Setor:</strong> {employee.setor_nome || "Não atribuído"}
              </p>
              <p>
                <strong>Salário:</strong> {formatCurrency(employee.salario)}
              </p>
              <p>
                <strong>Email:</strong> {employee.email}
              </p>
              <p>
                <strong>Telefone:</strong> {employee.telefone}
              </p>
              <p>
                <strong>Data de Nascimento:</strong>{" "}
                {formatDate(employee.data_nascimento)}
              </p>
              <p>
                <strong>Data de Admissão:</strong>{" "}
                {formatDate(employee.data_admissao)}
              </p>
              <ActionButtonsContainer>
                <ActionButton 
                  className="edit"
                  onClick={() => navigate(`/employees/edit/${employee.id}`)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Editar
                </ActionButton>
                <ActionButton 
                  className="delete"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Excluir
                </ActionButton>
              </ActionButtonsContainer>
            </EmployeeCard>
          ))
        )}
      </EmployeesBody>
      <Footer />
    </PageContainer>
  );
}

export default Employees;
