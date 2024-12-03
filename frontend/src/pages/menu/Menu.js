import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import {
  DivCard,
  MenuBody,
  StyledWrapper,
  CardsContainer,
  WelcomeHeader,
} from "./menu-styles";
import Button from "react-bootstrap/Button";
import authService from "../../services/authService";

function Menu() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (!currentUser || !authService.isAuthenticated()) {
      authService.logout();
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <MenuBody>
      <Navbar />
      {/* <LogoutButton onClick={handleLogout}>Sair</LogoutButton> */}

      <WelcomeHeader>
        <h2 className="mb-4 text-center welcome-text">
          Bem-vindo,{" "}
          <span className="user-name">
            {currentUser?.username || "Usuário"}
          </span>
        </h2>
        <div className="welcome-underline" />
      </WelcomeHeader>

      <CardsContainer>
        <DivCard>
          <StyledWrapper>
            <h2 className="mb-4 text-center">Exames</h2>
            <div className="card">
              <Button
                variant="light"
                className="menu-button"
                onClick={() => navigate("/exams")}
              >
                Gerenciar
              </Button>
              <Button
                variant="light"
                className="menu-button"
                onClick={() => navigate("/exams/pending")}
              >
                Exames Pendentes
              </Button>
            </div>
          </StyledWrapper>
        </DivCard>

        <DivCard>
          <StyledWrapper>
            <h2 className="mb-4 text-center">Consultas</h2>
            <div className="card">
              <Button
                variant="light"
                className="menu-button"
                onClick={() => navigate("/consultations")}
              >
                Gerenciar
              </Button>
              <Button
                variant="light"
                className="menu-button"
                onClick={() => navigate("/consultations/pending")}
              >
                Consultas Pendentes
              </Button>
            </div>
          </StyledWrapper>
        </DivCard>

        <DivCard>
          <StyledWrapper>
            <h2 className="mb-4 text-center">Pacientes</h2>
            <div className="card">
              <Button
                variant="light"
                className="menu-button"
                onClick={() => navigate("/patients")}
              >
                Gerenciar
              </Button>
              <Button variant="light" className="menu-button" disabled>
                Botão 2
              </Button>
            </div>
          </StyledWrapper>
        </DivCard>

        {authService.isAdmin() && (
          <>
            <DivCard>
              <StyledWrapper>
                <h2 className="mb-4 text-center">Despesas</h2>
                <div className="card">
                  <Button
                    variant="light"
                    className="menu-button"
                    onClick={() => navigate("/expenses")}
                  >
                    Gerenciar
                  </Button>
                  <Button variant="light" className="menu-button" disabled>
                    Botão 2
                  </Button>
                </div>
              </StyledWrapper>
            </DivCard>

            <DivCard>
              <StyledWrapper>
                <h2 className="mb-4 text-center">Doações</h2>
                <div className="card">
                  <Button
                    variant="light"
                    className="menu-button"
                    onClick={() => navigate("/donations")}
                  >
                    Gerenciar
                  </Button>
                  <Button variant="light" className="menu-button" disabled>
                    Botão 2
                  </Button>
                </div>
              </StyledWrapper>
            </DivCard>

            <DivCard>
              <StyledWrapper>
                <h2 className="mb-4 text-center">Setores</h2>
                <div className="card">
                  <Button
                    variant="light"
                    className="menu-button"
                    onClick={() => navigate("/sectors")}
                  >
                    Gerenciar
                  </Button>
                  <Button variant="light" className="menu-button" disabled>
                    Botão 2
                  </Button>
                </div>
              </StyledWrapper>
            </DivCard>

            <DivCard>
              <StyledWrapper>
                <h2 className="mb-4 text-center">Transportes</h2>
                <div className="card">
                  <Button
                    variant="light"
                    className="menu-button"
                    onClick={() => navigate("/transport")}
                  >
                    Gerenciar
                  </Button>
                  <Button
                    variant="light"
                    className="menu-button"
                    onClick={() => navigate("/transport/vehicles")}
                  >
                    Veículos
                  </Button>
                </div>
              </StyledWrapper>
            </DivCard>

            <DivCard>
              <StyledWrapper>
                <h2 className="mb-4 text-center">Funcionários</h2>
                <div className="card">
                  <Button
                    variant="light"
                    className="menu-button"
                    onClick={() => navigate("/employees")}
                  >
                    Gerenciar
                  </Button>
                  <Button variant="light" className="menu-button" disabled>
                    Botão 2
                  </Button>
                </div>
              </StyledWrapper>
            </DivCard>

            <DivCard>
              <StyledWrapper>
                <h2 className="mb-4 text-center">Usuários</h2>
                <div className="card">
                  <Button
                    variant="light"
                    className="menu-button"
                    onClick={() => navigate("/users")}
                  >
                    Gerenciar
                  </Button>
                  <Button variant="light" className="menu-button" disabled>
                    Botão 2
                  </Button>
                </div>
              </StyledWrapper>
            </DivCard>
          </>
        )}
      </CardsContainer>
      <Footer />
    </MenuBody>
  );
}

export default Menu;
