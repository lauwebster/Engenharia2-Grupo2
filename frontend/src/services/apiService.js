import authService from "./authService";
import eventService from "../services/eventService";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

const apiService = {
  async getPatients() {
    const response = await fetch(`${apiUrl}/pacientes`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Error fetching patients");
    }
    return data.pacientes;
  },

  async getTransports() {
    const response = await fetch(`${apiUrl}/transporte`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Error fetching transports");
    }
    return data.transportes;
  },

  async getVehicles() {
    const response = await fetch(`${apiUrl}/veiculos`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Error fetching vehicles");
    }
    return data.veiculos;
  },

  async getExpenses() {
    const response = await fetch(`${apiUrl}/despesa`, {
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (!data.success) {
      throw new Error(data.message || "Error fetching expenses");
    }
    return data.despesas;
  },

  async getDonations() {
    const response = await fetch(`${apiUrl}/doacoes`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching donations");
    }
    return data.doacoes;
  },

  async getDonation(id) {
    const response = await fetch(`${apiUrl}/doacoes/${id}`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching donation");
    }
    return data.doacao;
  },

  async createDonation(donationData) {
    const response = await fetch(`${apiUrl}/doacoes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(donationData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating donation");
    }
    return data.doacao;
  },

  async updateDonation(id, donationData) {
    const response = await fetch(`${apiUrl}/doacoes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(donationData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error updating donation");
    }
    return data.doacao;
  },

  async deleteDonation(id) {
    const response = await fetch(`${apiUrl}/doacoes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting donation");
    }
    return data;
  },

  async getDrivers() {
    const response = await fetch(`${apiUrl}/motorista`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Error fetching drivers");
    }
    return data.motoristas;
  },

  async getUserConsultations(userId) {
    const response = await fetch(`${apiUrl}/consulta/paciente/${userId}`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching user consultations");
    }
    return data.consultas;
  },

  async getInstitutions() {
    const response = await fetch(`${apiUrl}/instituicoes`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching institutions");
    }
    return data.instituicoes;
  },

  async getPatientDetails(userId) {
    const response = await fetch(`${apiUrl}/pacientes/${userId}`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching patient details");
    }
    return data.paciente;
  },

  async createConsultation(consultationData) {
    const response = await fetch(`${apiUrl}/consulta`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(consultationData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating consultation");
    }
    return data;
  },

  async createInstitution(institutionData) {
    const response = await fetch(`${apiUrl}/instituicoes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(institutionData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating institution");
    }
    return data;
  },

  async createExam(examData) {
    const response = await fetch(`${apiUrl}/exame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(examData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating exam");
    }
    return data;
  },

  async createExamType(examTypeData) {
    if (!examTypeData.nome) {
      throw new Error("Nome do tipo de exame é obrigatório");
    }

    const response = await fetch(`${apiUrl}/tipo-exame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(examTypeData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Erro ao criar tipo de exame");
    }
    return data.tipoExame;
  },

  async deletePatient(patientId) {
    const response = await fetch(`${apiUrl}/pacientes/${patientId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting patient");
    }
    return data;
  },

  async deleteTransport(transportId) {
    const response = await fetch(`${apiUrl}/transporte/${transportId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting transport");
    }
    return data;
  },

  async deleteVehicle(vehicleId) {
    const response = await fetch(`${apiUrl}/veiculos/${vehicleId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting vehicle");
    }
    return data;
  },

  async deleteExpense(expenseId) {
    const response = await fetch(`${apiUrl}/despesa/${expenseId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting expense");
    }
    return data;
  },

  async createVehicle(vehicleData) {
    const response = await fetch(`${apiUrl}/veiculos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(vehicleData),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Error creating vehicle");
    }
    return data;
  },

  async getPatient(id) {
    const response = await fetch(`${apiUrl}/pacientes/${id}`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching patient");
    }
    return data.paciente;
  },

  async updatePatient(id, patientData) {
    const response = await fetch(`${apiUrl}/pacientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(patientData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error updating patient");
    }
    return data;
  },

  async createExpense(expenseData) {
    const response = await fetch(`${apiUrl}/despesa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(expenseData),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Error creating expense");
    }
    return data.despesa;
  },

  async updateExpenseStatus(expenseId, status) {
    const response = await fetch(`${apiUrl}/despesa/${expenseId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error updating expense status");
    }
    return data.despesa;
  },

  async getExpense(id) {
    const response = await fetch(`${apiUrl}/despesa/${id}`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching expense");
    }
    return data.despesa;
  },

  async updateExpense(id, expenseData) {
    const response = await fetch(`${apiUrl}/despesa/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(expenseData),
    });
    const data = await response.json();
    return data.despesa;
  },

  getTransportById: async (id) => {
    try {
      const response = await fetch(`${apiUrl}/transporte/${id}`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Erro ao buscar transporte");
      }

      return data.transporte;
    } catch (error) {
      throw new Error(error.message || "Erro ao conectar com o servidor");
    }
  },

  updateTransport: async (id, transportData) => {
    try {
      const response = await fetch(`${apiUrl}/transporte/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(transportData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Erro ao atualizar transporte");
      }

      return data.transporte;
    } catch (error) {
      throw new Error(error.message || "Erro ao conectar com o servidor");
    }
  },

  getVehicleById: async (id) => {
    try {
      const response = await fetch(`${apiUrl}/veiculos/${id}`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Erro ao buscar veículo");
      }

      return data.veiculo;
    } catch (error) {
      throw new Error(error.message || "Erro ao conectar com o servidor");
    }
  },

  updateVehicle: async (id, vehicleData) => {
    try {
      const response = await fetch(`${apiUrl}/veiculos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(vehicleData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Erro ao atualizar veículo");
      }

      return data.veiculo;
    } catch (error) {
      throw new Error(error.message || "Erro ao conectar com o servidor");
    }
  },

  async getCaixaStatus() {
    const response = await fetch(`${apiUrl}/caixa/status`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching caixa status");
    }
    return data;
  },

  async openCaixa(data) {
    const response = await fetch(`${apiUrl}/caixa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Error opening caixa");
    }
    return responseData;
  },

  async closeCaixa(data) {
    const response = await fetch(`${apiUrl}/caixa/close`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Error closing caixa");
    }
    return responseData;
  },

  async addCaixaMovement(id, data) {
    const response = await fetch(`${apiUrl}/caixa/${id}/movimento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Error adding movement");
    }
    return responseData;
  },

  async payExpense(expense) {
    if (expense.status === "paga") {
      return;
    }

    if (!expense.valor) {
      throw new Error("Value error");
    }

    const user = await authService.getCurrentUser();
    if (!user?.id) {
      throw new Error("Responsável é obrigatório");
    }

    const caixa = await this.getCaixaStatus();
    
    if (caixa.saldo_atual < expense.valor) {
      throw new Error("Saldo insuficiente em caixa para pagar esta despesa");
    }

    const response = await this.addCaixaMovement(caixa.id, {
      valor: expense.valor,
      tipo_movimento: "saida",
      responsavel_id: user.id,
    });

    if (!response.success) {
      throw new Error(response.message || "Error adding movement");
    }


    await this.updateExpense(expense.id, {
      descricao: expense.descricao,
      data_despesa: expense.data_despesa,
      valor: expense.valor,
      tipo: expense.tipo,
      status: "paga",
      caixa_id: caixa.id
    });

    eventService.emit("BALANCE_UPDATED");

    return { success: true };
  },

  async getSetores() {
    const response = await fetch(`${apiUrl}/setor`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching setores");
    }
    return data.setores;
  },

  async createSetor(setorData) {
    const response = await fetch(`${apiUrl}/setor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(setorData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating setor");
    }
    return data.setor;
  },

  async createRepasse(repasseData) {
    const response = await fetch(`${apiUrl}/setor/repasse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(repasseData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating repasse");
    }
    return data.repasse;
  },

  async getRepasses(setorId = null) {
    const url = new URL(`${apiUrl}/setores/repasses`);
    if (setorId) url.searchParams.append("setor_id", setorId);

    const response = await fetch(url, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching repasses");
    }
    return data.repasses;
  },

  async getFuncionarios() {
    const response = await fetch(`${apiUrl}/funcionarios`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching funcionarios");
    }
    return data.funcionarios;
  },

  async createFuncionario(funcionarioData) {
    const response = await fetch(`${apiUrl}/funcionarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(funcionarioData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating funcionario");
    }
    return data;
  },

  async updateFuncionario(id, funcionarioData) {
    const response = await fetch(`${apiUrl}/funcionarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(funcionarioData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error updating funcionario");
    }
    return data;
  },

  async deleteFuncionario(id) {
    const response = await fetch(`${apiUrl}/funcionarios/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting funcionario");
    }
    return data;
  },

  async getFuncionarioById(id) {
    const response = await fetch(`${apiUrl}/funcionarios/${id}`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching employee");
    }
    return data.funcionario;
  },

  async updateConsultation(consultationId, updateData) {
    try {
      const response = await fetch(`${apiUrl}/consulta/${consultationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar consulta");
      }

      return data.consulta;
    } catch (error) {
      throw new Error(error.message || "Erro ao conectar com o servidor");
    }
  },

  async getPendingConsultations() {
    try {
      const response = await fetch(`${apiUrl}/consulta/pending`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar consultas pendentes");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Erro ao conectar com o servidor");
    }
  },

  getUserExams: async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/exames/usuario/${userId}`, {
        credentials: "include",
      });
      const data = await response.json();
      return data.exames;
    } catch (error) {
      throw error;
    }
  },

  async getUsers() {
    const response = await fetch(`${apiUrl}/usuario`, {
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching users");
    }
    console.log(data);
    return data.users;
  },

  async updateUser(userId, userData) {
    const response = await fetch(`${apiUrl}/usuario/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error updating user");
    }
    return data.user;
  },

  async deleteUser(userId) {
    const response = await fetch(`${apiUrl}/usuario/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting user");
    }
    return data;
  },

  async updateUserStatus(userId, status) {
    try {
      const response = await fetch(`${apiUrl}/usuario/${userId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar status do usuário");
      }

      return data.user;
    } catch (error) {
      throw new Error(error.message || "Erro ao conectar com o servidor");
    }
  },

  async getParametrization() {
    try {
      const response = await fetch(`${apiUrl}/parametrizacao`, {
        credentials: 'include'
      });
      const data = await response.json();
      return data.success ? data.parametrizacoes : null;
    } catch (error) {
      console.error('Error fetching parametrization:', error);
      throw error;
    }
  },

  async createParametrization(params) {
    try {
      const response = await fetch(`${apiUrl}/parametrizacao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(params)
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.parametrizacao;
    } catch (error) {
      console.error('Error creating parametrization:', error);
      throw error;
    }
  },

  async updateParametrization(params) {
    try {
      const response = await fetch(`${apiUrl}/parametrizacao/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(params)
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.parametrizacao;
    } catch (error) {
      console.error('Error updating parametrization:', error);
      throw error;
    }
  }
};

export default apiService;
