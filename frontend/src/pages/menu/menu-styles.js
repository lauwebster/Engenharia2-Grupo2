import styled from "styled-components";

export const MenuBody = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #F0E2B5;
`;

export const DivCard = styled.div`
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    width: 300px;
    height: fit-content;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const StyledWrapper = styled.div`
    h2 {
        color: #333;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: none;
        padding: 0;
    }

    .menu-button {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        transition: all 0.3s ease;

        &:hover {
            background: #e9ecef;
            transform: scale(1.02);
        }

        &:active {
            transform: scale(0.98);
        }
    }
`;

export const LogoutButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 1000;

    &:hover {
        background-color: #c82333;
    }
`;

export const DivTitulo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
`;

export const DivCentral = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 300px;
  height: 300px;
  background-color: lightgray;
`

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    flex: 1;
`

export const WelcomeHeader = styled.div`
    user-select: none;
    cursor: default;
    text-align: center;
    padding: 2rem 1rem;
    margin-bottom: 1rem;

    .welcome-text {
        color: #333;
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }

    .user-name {
        color: #a1238c;
        font-weight: 600;
    }

    .welcome-underline {
        width: 100px;
        height: 3px;
        background: #a1238c;
        margin: 0 auto;
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        padding: 1.5rem 1rem;
        
        .welcome-text {
            font-size: 1.5rem;
        }
    }
`