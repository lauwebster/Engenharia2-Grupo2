import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ConsultationsContainer = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 6rem auto 2rem;
  width: 100%;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

export const UserSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AlertMessage = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: ${(props) =>
    props.variant === "danger" ? "#f8d7da" : "#d4edda"};
  color: ${(props) => (props.variant === "danger" ? "#721c24" : "#155724")};
  border: 1px solid
    ${(props) => (props.variant === "danger" ? "#f5c6cb" : "#c3e6cb")};
`; 