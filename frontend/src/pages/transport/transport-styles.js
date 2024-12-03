import styled from "styled-components";

export const TransportBody = styled.div`
  padding: 100px 20px 60px;
  flex: 1;
`;

export const TransportHeader = styled.div`
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

export const TransportContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
`;

export const TransportCard = styled.div`
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h4 {
    color: #a1238c;
    margin-bottom: 10px;
  }

  p {
    color: #555;
    margin: 0.5rem 0;
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