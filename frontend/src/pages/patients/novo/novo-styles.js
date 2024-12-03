import styled from "styled-components";

export const FormWrapper = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 800px;
  background: white;
  margin: 20px auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormHeader = styled.div`
  margin-bottom: 30px;
  
  h2 {
    margin: 0;
    color: #333;
    font-size: 24px;
    text-transform: capitalize;
  }
`;

export const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: #444;
  }

  input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: #6a1b9a;
      box-shadow: 0 0 0 2px rgba(106, 27, 154, 0.1);
    }
  }

  .error-message {
    color: #d32f2f;
    font-size: 14px;
    margin-top: 4px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;

  button {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &.cancel {
      background-color: #f5f5f5;
      color: #666;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    &.save {
      background-color: #6a1b9a;
      color: white;

      &:hover {
        background-color: #8e24aa;
      }
    }
  }
`; 