import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 200px);
`;

export const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h2 {
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  input[type="file"] {
    padding: 0.5rem 0;
    border: none;

    &::-webkit-file-upload-button {
      padding: 0.5rem 1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 1rem;

      &:hover {
        background: #0056b3;
      }
    }
  }
`;

export const LogoPreview = styled.div`
  margin-top: 1rem;
  text-align: center;

  img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const ErrorText = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const SecondaryButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

export const FormSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const FormTitle = styled.h3`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

export const RequiredField = styled.span`
  color: #dc3545;
  margin-left: 4px;
`;

export const InfoText = styled.p`
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
