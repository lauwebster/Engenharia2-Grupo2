import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const EmployeesBody = styled.div`
  flex: 1;
  padding: 70px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const EmployeesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-top: 20px;

  h1 {
    margin: 0;
    font-size: 24px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const EmployeeCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${props => 
    props.status === 'active' ? '#90EE90' :
    props.status === 'vacation' ? '#ffd700' :
    props.status === 'leave' ? '#dc3545' :
    '#87CEEB'
  };
  color: ${props => props.status === 'vacation' ? '#000' : '#fff'};
`;

export const AddEmployeeButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #218838;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 6px;

  &.edit {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  &.delete {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
    }
  }

  svg {
    width: 16px;
    height: 16px;
  }
`; 