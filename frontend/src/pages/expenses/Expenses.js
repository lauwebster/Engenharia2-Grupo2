import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import {
  ExpensesBody,
  ExpensesHeader,
  ExpensesContainer,
  ExpenseCard,
  ErrorMessage,
  EmptyState,
} from "./expenses-styles";
import apiService from "../../services/apiService";
import FloatingBalanceCard from "../../components/FloatingBalanceCard";

function Expenses() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [balanceKey, setBalanceKey] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const despesas = await apiService.getExpenses();
        setExpenses(despesas);
      } catch (err) {
        setError(err.message || "Erro ao conectar com o servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleNewExpense = () => {
    navigate("/expenses/new");
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar esta despesa?")) {
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/despesa/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setExpenses(expenses.filter((expense) => expense.id !== id));
      } else {
        setError("Erro ao deletar despesa");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handlePayExpense = async (expense) => {
    try {
      await apiService.payExpense(expense);
      const updatedExpenses = await apiService.getExpenses();
      setExpenses(updatedExpenses);
      setBalanceKey(prev => prev + 1);
    } catch (err) {
      setError(err.message || "Erro ao pagar despesa");
      setTimeout(() => setError(""), 5000);
    }
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <FloatingBalanceCard key={balanceKey} />
      <ExpensesBody>
        <ExpensesHeader>
          <h1>Despesas</h1>
          <button onClick={handleNewExpense}>Nova Despesa</button>
        </ExpensesHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ExpensesContainer>
          {loading ? (
            <p>Carregando despesas...</p>
          ) : expenses.length === 0 ? (
            <EmptyState>
              <h3>Nenhuma despesa encontrada</h3>
              <p>Clique em "Nova Despesa" para adicionar uma despesa</p>
            </EmptyState>
          ) : (
            expenses.map((expense) => (
              <ExpenseCard key={expense.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4>Despesa #{String(expense.id).padStart(3, "0")}</h4>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.875rem",
                        backgroundColor:
                          expense.status === "paga"
                            ? "#28a745"
                            : expense.status === "cancelada"
                            ? "#dc3545"
                            : "#ffc107",
                        color: expense.status === "pendente" ? "#000" : "#fff",
                      }}
                    >
                      {expense.status.charAt(0).toUpperCase() +
                        expense.status.slice(1)}
                    </span>
                    <button
                      onClick={() => navigate(`/expenses/edit/${expense.id}`)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                      title="Editar despesa"
                    >
                      ✏️
                    </button>
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        color: "#ff4444",
                      }}
                      onClick={() => handleDeleteExpense(expense.id)}
                      title="Deletar despesa"
                    >
                      🗑️
                    </span>
                  </div>
                </div>
                <p>
                  <strong>Descrição:</strong> {expense.descricao}
                </p>
                <p>
                  Data: {new Date(expense.data_despesa).toLocaleDateString()}
                </p>
                {expense.status === "paga" && expense.data_pagamento && (
                  <p>
                    <strong>Data de Pagamento:</strong> {formatDateTime(expense.data_pagamento)}
                  </p>
                )}
                <p>Valor: {formatCurrency(expense.valor)}</p>
                <p>Tipo: {expense.tipo}</p>
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "#28a745",
                  }}
                  onClick={() => handlePayExpense(expense)}
                  title="Pagar despesa"
                >
                  <button
                    style={{
                      backgroundColor: "#9c27b0",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      width: "100px",
                      disabled: expense.status === "paga",
                      opacity: expense.status === "paga" ? 0.5 : 1,
                    }}
                  >
                    PAGAR
                  </button>
                </span>
              </ExpenseCard>
            ))
          )}
        </ExpensesContainer>
      </ExpensesBody>
      <Footer />
    </div>
  );
}

export default Expenses;
