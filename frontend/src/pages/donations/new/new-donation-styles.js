import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F0E2B5;
`;

export const FormContainer = styled.div`
  max-width: 600px;
  width: 90%;
  margin: 90px auto 20px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  margin-bottom: 60px;
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    color: #a1238c;
    font-size: 1.8rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #a1238c;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  select {
    background-color: white;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
`;

export const SubmitButton = styled.button`
  background-color: #a1238c;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    background-color: #87207c;
  }
`;

export const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`; 