import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ExamsContainer = styled.div`
  padding: 2rem;
  margin-top: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ExamCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  width: 100%;

  h4 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    color: #666;
    margin: 0.25rem 0;
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

export const AddButton = styled(Link)`
  background-color: #a1238c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    background-color: #8e1c7a;
    color: white;
  }
`;

