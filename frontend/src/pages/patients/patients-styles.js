import styled from "styled-components";

export const PatientsBody = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px auto 20px;
  width: 50%;
  max-width: 1200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
  
  h2 {
    margin: 0;
    text-transform: capitalize;
    color: #333;
    font-size: 24px;
  }

  .new-patient-btn {
    padding: 10px 20px;
    font-weight: bold;
    border-radius: 8px;
    background-color: #6a1b9a;
    border: none;
    color: white;
    
    &:hover {
      background-color: #8e24aa;
    }
  }
`;

export const SearchSection = styled.div`
  margin: 20px;
  
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: #6a1b9a;
      box-shadow: 0 0 0 2px rgba(106, 27, 154, 0.1);
    }
  }
`;

export const PatientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
`;

export const PatientItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-1px);
  }
`;

export const PatientId = styled.span`
  width: 80px;
  color: #666;
  font-weight: bold;
`;

export const PatientName = styled.span`
  flex: 1;
  color: #333;
`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 1rem;

  .icon {
    padding: 0;
    color: #8B4F8F;
    font-size: 1.2rem;
    
    &:hover {
      color: #723f75;
      opacity: 0.8;
    }
  }
`;