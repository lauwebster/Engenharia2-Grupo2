import styled from 'styled-components';

export const VehiclesBody = styled.div`
  padding: 2rem;
  flex: 1;
  padding-top: 90px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const VehiclesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    color: #333;
    margin: 0;
  }

  button {
    background: #a1238c;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background: #8e1d7a;
    }
  }
`;

export const VehiclesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
`;

export const VehicleCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h4 {
    color: #333;
    margin: 0 0 1rem 0;
  }

  p {
    margin: 0.5rem 0;
    color: #666;

    strong {
      color: #333;
    }
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    transition: all 0.3s ease;
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
  background-color: #ffe6e6;
  color: #f52019;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`; 