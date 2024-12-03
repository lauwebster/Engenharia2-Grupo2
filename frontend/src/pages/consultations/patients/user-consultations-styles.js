import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ConsultationsContainer = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 6rem auto 2rem;
  width: 100%;
`;

export const ConsultationCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h4 {
    margin: 0 0 10px 0;
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #666;
  }
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

export const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: #666;
  text-decoration: none;
  
  &:hover {
    color: #333;
  }
`;

export const AddButton = styled(Link)`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background-color: #45a049;
  }
`; 