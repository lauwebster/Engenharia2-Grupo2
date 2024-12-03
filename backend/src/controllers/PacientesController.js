import Pacientes from "../models/PacientesModel.js";

class PacientesController {
  static async createPaciente(req, res) {
    try {
      const { nome, cpf, email, data_nascimento, telefone } = req.body;

      if (!nome || !cpf) {
        return res.status(400).json({
          success: false,
          message: "Nome e CPF são obrigatórios",
        });
      }

      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpf)) {
        return res.status(400).json({
          success: false,
          message: "CPF inválido",
        });
      }

      const existingPaciente = await Pacientes.findByCpf(cpf);
      if (existingPaciente) {
        return res.status(400).json({
          success: false,
          message: "CPF já cadastrado",
        });
      }

      const cleanedData = {
        nome,
        cpf,
        email: email || null,
        telefone: telefone || null,
        data_nascimento: data_nascimento || null
      };

      const newPaciente = await Pacientes.create(cleanedData);

      res.status(201).json({
        success: true,
        message: "Paciente criado com sucesso",
        paciente: newPaciente[0],
      });
    } catch (error) {
      console.error("Error creating paciente:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao criar paciente",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getAllPacientes(req, res) {
    try {
      const pacientes = await Pacientes.findAll();
      if (!pacientes || pacientes.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nenhum paciente encontrado",
        });
      }
      res.status(200).json({
        success: true,
        pacientes,
      });
    } catch (error) {
      console.error("Error fetching pacientes:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar pacientes",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async getPacienteById(req, res) {
    try {
      const paciente = await Pacientes.findById(req.params.id);
      if (!paciente) {
        return res.status(404).json({
          success: false,
          message: "Paciente não encontrado",
        });
      }
      res.status(200).json({
        success: true,
        paciente,
      });
    } catch (error) {
      console.error("Error fetching paciente:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar paciente",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async updatePaciente(req, res) {
    try {
      const { nome, cpf, email, data_nascimento, telefone } = req.body;
      
      if (cpf) {
        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(cpf)) {
          return res.status(400).json({
            success: false,
            message: "CPF inválido",
          });
        }

        const existingPaciente = await Pacientes.findByCpf(cpf);
        if (existingPaciente && existingPaciente.id !== parseInt(req.params.id)) {
          return res.status(400).json({
            success: false,
            message: "CPF já cadastrado para outro paciente",
          });
        }
      }

      const paciente = await Pacientes.update(req.params.id, {
        nome,
        cpf,
        email,
        data_nascimento,
        telefone
      });

      if (!paciente || paciente.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Paciente não encontrado para atualização",
        });
      }

      res.status(200).json({
        success: true,
        message: "Paciente atualizado com sucesso",
        paciente: paciente[0],
      });
    } catch (error) {
      console.error("Error updating paciente:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar paciente",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async deletePaciente(req, res) {
    try {
      const paciente = await Pacientes.findById(req.params.id);
      if (!paciente) {
        return res.status(404).json({
          success: false,
          message: "Paciente não encontrado para exclusão",
        });
      }

      await Pacientes.delete(req.params.id);
      
      res.status(200).json({
        success: true,
        message: "Paciente excluído com sucesso",
      });
    } catch (error) {
      console.error("Error deleting paciente:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao excluir paciente",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

} 

export default PacientesController;