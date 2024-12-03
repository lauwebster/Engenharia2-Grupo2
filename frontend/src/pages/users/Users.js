import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiUserX, FiUserCheck } from "react-icons/fi";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import apiService from "../../services/apiService";
import {
  PageContainer,
  ContentWrapper,
  Container,
  Title,
  Table,
  Th,
  Td,
  IconButton,
  Modal,
  ModalContent,
  ModalTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  ButtonGroup,
  Button,
  AlertMessage,
} from "./users-styles";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    permissao: "",
  });

  const showAlert = (message, isError = false) => {
    setAlert({ message, isError });
    setTimeout(() => setAlert(null), 3000);
  };

  const fetchUsers = React.useCallback(async () => {
    try {
      const users = await apiService.getUsers();
      setUsers(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      // setError("Error fetching users. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      permissao: user.permissao,
    });
    setOpenModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await apiService.deleteUser(userId);
        showAlert("Usuário excluído com sucesso!");
        fetchUsers();
      } catch (error) {
        showAlert(error.message, true);
      }
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setEditForm({
      username: "",
      email: "",
      permissao: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateUser(selectedUser.id, editForm);
      showAlert("Usuário atualizado com sucesso!");
      handleClose();
      fetchUsers();
    } catch (error) {
      showAlert(error.message, true);
    }
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusToggle = async (user) => {
    try {
      const newStatus = user.status === true ? 0 : 1;
      await apiService.updateUserStatus(user.id, newStatus);
      showAlert(
        `Usuário ${newStatus === 1 ? "ativado" : "desativado"} com sucesso!`
      );
      fetchUsers();
    } catch (error) {
      showAlert(error.message || "Erro ao atualizar status do usuário", true);
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentWrapper>
        <Container>
          {alert && (
            <AlertMessage error={alert.isError}>{alert.message}</AlertMessage>
          )}

          <Title>Gerenciar Usuários</Title>

          <Table>
            <thead>
              <tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Permissão</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.permissao === 1 ? "Administrador" : "Usuário"}</Td>
                  <Td>{user.status === true ? "Ativo" : "Inativo"}</Td>
                  <Td>
                    <IconButton onClick={() => handleEdit(user)}>
                      <FiEdit size={18} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleStatusToggle(user)}
                      title={
                        user.status === 1 ? "Desativar usuário" : "Ativar usuário"
                      }
                    >
                      {user.status === 1 ? (
                        <FiUserX size={18} />
                      ) : (
                        <FiUserCheck size={18} />
                      )}
                    </IconButton>
                    <IconButton delete onClick={() => handleDelete(user.id)}>
                      <FiTrash2 size={18} />
                    </IconButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>

          {openModal && (
            <Modal>
              <ModalContent>
                <ModalTitle>Editar Usuário</ModalTitle>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input
                      name="username"
                      type="text"
                      value={editForm.username}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
                      value={editForm.email}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Permissão</Label>
                    <Select
                      name="permissao"
                      value={editForm.permissao}
                      onChange={handleChange}
                    >
                      <option value={0}>Usuário</option>
                      <option value={1}>Administrador</option>
                    </Select>
                  </FormGroup>

                  <ButtonGroup>
                    <Button type="button" onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button type="submit" primary>
                      Salvar
                    </Button>
                  </ButtonGroup>
                </Form>
              </ModalContent>
            </Modal>
          )}
        </Container>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default Users;
