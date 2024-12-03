import styled from "styled-components";

export const FormWrapper = styled.div`
  flex: 1;
  padding: 40px;
  max-width: 800px;
  width: 100%;
  background: white;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

export const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  .error-message {
    color: #dc3545;
    font-size: 14px;
    margin-top: 5px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &.cancel {
      background-color: #6c757d;
      color: white;
    }

    &.submit {
      background-color: #007bff;
      color: white;
    }

    &:hover {
      opacity: 0.9;
    }
  }
`;
