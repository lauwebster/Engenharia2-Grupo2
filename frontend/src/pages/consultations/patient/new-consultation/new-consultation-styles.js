import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
`;

export const StyledForm = styled.form`
  width: 100%;
  max-width: 600px;
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

  select {
    background-color: white;
  }
`;

export const SubmitButton = styled.button`
  background-color: #a1238c;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 2rem;

  &:hover {
    background-color: #8e1c7a;
  }
`;

export const BackButton = styled(Link)`
  margin-bottom: 1rem;
  display: inline-block;
  text-decoration: none;
  color: #666;
  align-self: flex-start;
  &:hover {
    color: #333;
  }
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`; 

export const PatientInfo = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #a1238c;

  h3 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    color: #666;
    margin: 0.25rem 0;
  }
`; 