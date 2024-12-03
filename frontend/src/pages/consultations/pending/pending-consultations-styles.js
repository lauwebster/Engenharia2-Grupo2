import styled from "styled-components";

export const ContentWrapper = styled.div`
  min-height: calc(100vh - 160px);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  flex: 1;
`;

export const Title = styled.h2`
  margin-bottom: 2rem;
  color: #333;
`;

export const ConsultationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const ConsultationCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .consultation-info {
    h5 {
      margin: 0 0 10px 0;
      color: #333;
    }

    p {
      margin: 5px 0;
      color: #666;
    }
  }

  .consultation-actions {
    display: flex;
    gap: 10px;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  margin-top: 40px;
`;

export const AlertMessage = styled.div`
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  background-color: ${props => props.variant === 'danger' ? '#f8d7da' : '#d4edda'};
  color: ${props => props.variant === 'danger' ? '#721c24' : '#155724'};
  border: 1px solid ${props => props.variant === 'danger' ? '#f5c6cb' : '#c3e6cb'};
`; 