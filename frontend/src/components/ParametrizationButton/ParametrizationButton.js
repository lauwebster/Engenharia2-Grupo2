import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonContainer, StyledButton } from "./parametrization-button-styles";
import authService from "../../services/authService";

function ParametrizationButton({ isAdmin }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/parametrization");
  };

  return (
    <ButtonContainer>
      <StyledButton onClick={handleClick}>
        {authService.isAdmin()
          ? "Editar Configurações"
          : "Visualizar Configurações"}
      </StyledButton>
    </ButtonContainer>
  );
}

export default ParametrizationButton;
