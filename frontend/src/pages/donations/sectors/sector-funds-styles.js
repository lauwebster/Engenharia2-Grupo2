import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 100px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HeaderTitle = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 2.5rem;
  font-weight: 600;
`;

export const HeaderDescription = styled.p`
  color: #6c757d;
  margin: 0;
  font-size: 1.1rem;
  max-width: 600px;
  line-height: 1.5;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const SectorCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const TransferModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  width: 90%;
  max-width: 500px;

  .donations-list {
    margin: 20px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
  }

  .donation-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    
    &:hover {
      background-color: #f5f5f5;
    }
    
    &.selected {
      background-color: #e3f2fd;
    }
    
    input[type="checkbox"] {
      margin-right: 10px;
    }
    
    span {
      margin-right: 15px;
      
      &:last-child {
        margin-left: auto;
      }
    }
  }

  .summary {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 2px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  background-color: #f8d7da;
`;

export const ErrorBanner = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
`; 