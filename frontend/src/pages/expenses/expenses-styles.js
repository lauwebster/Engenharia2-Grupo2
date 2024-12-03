import styled from 'styled-components';

export const ExpensesBody = styled.div`
  padding: 20px 20px 60px;
  flex: 1;
`;

export const ExpensesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    color: #a1238c;
  }

  button {
    padding: 10px 20px;
    background-color: #a1238c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #87207c;
    }
  }
`;

export const ExpensesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const ExpenseCard = styled.div`
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    color: #a1238c;
    margin-bottom: 10px;
  }

  p {
    color: #555;
    margin-bottom: 15px;
  }
`;

export const ExpenseButton = styled.button`
  padding: 8px 16px;
  background-color: #1af0e1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #15c7b5;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;

  h3 {
    color: #a1238c;
    margin-bottom: 10px;
  }

  p {
    color: #666;
  }
`;

export const ErrorMessage = styled.div`
  color: #f52019;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`; 