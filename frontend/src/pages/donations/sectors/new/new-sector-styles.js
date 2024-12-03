import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F0E2B5;
`;

export const MainContent = styled.div`
  flex: 1;
`;

export const Container = styled.div`
  max-width: 600px;
  width: 90%;
  margin: 90px auto 20px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 14px;
  display: block;
  margin-top: 5px;
`;

export const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export const CancelButton = styled.button`
  background-color: #f52019;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #da190b;
  }
`; 