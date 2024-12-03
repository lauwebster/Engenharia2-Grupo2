import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import apiService from '../services/apiService';
import authService from '../services/authService';
import eventService from '../services/eventService';

const FloatingCard = styled.div`
  position: fixed;
  bottom: 190px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 300px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const BalanceDisplay = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.$isPositive ? '#28a745' : '#dc3545'};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background-color: ${props => props.$variant === 'primary' ? '#007bff' : 
                              props.$variant === 'success' ? '#28a745' : 
                              props.$variant === 'danger' ? '#dc3545' : '#6c757d'};
  color: white;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const MovementModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  width: 300px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

function FloatingBalanceCard() {
  const [balance, setBalance] = useState(0);
  const [caixaStatus, setCaixaStatus] = useState(null);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [movementValue, setMovementValue] = useState('');
  const [movementType, setMovementType] = useState('entrada');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCaixaStatus = async () => {
    try {
      const response = await apiService.getCaixaStatus();
      setCaixaStatus(response);
      if (response.aberto) {
        setBalance(response.saldo_atual);
      }
    } catch (error) {
      console.error('Erro ao buscar status do caixa:', error);
    }
  };

  useEffect(() => {
    fetchCaixaStatus();
    
    const handleBalanceUpdate = () => {
      fetchCaixaStatus();
    };
    
    eventService.on('BALANCE_UPDATED', handleBalanceUpdate);
    
    return () => {
      eventService.off('BALANCE_UPDATED', handleBalanceUpdate);
    };
  }, []);

  const handleOpenCaixa = async () => {
    try {
      setLoading(true);
      setError('');
      const user = authService.getCurrentUser();
      await apiService.openCaixa({
        responsavel_id: user.id
      });
      
      await fetchCaixaStatus();
    } catch (error) {
      setError(error.message || 'Erro ao abrir caixa');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseCaixa = async () => {
    if (!window.confirm('Deseja realmente fechar o caixa?')) return;
    
    try {
      setLoading(true);
      const user = authService.getCurrentUser();
      await apiService.closeCaixa({
        responsavel_id: user.id
      });
      setCaixaStatus({ aberto: false });
      setBalance(0);
    } catch (error) {
      setError(error.message || 'Erro ao fechar caixa');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovement = async () => {
    try {
      setLoading(true);
      const value = parseFloat(movementValue);
      if (isNaN(value) || value <= 0) {
        throw new Error('Valor inválido');
      }

      const user = authService.getCurrentUser();
      await apiService.addCaixaMovement(caixaStatus.id, {
        tipo_movimento: movementType,
        valor: value,
        responsavel_id: user.id
      });

      await fetchCaixaStatus();
      setShowMovementModal(false);
      setMovementValue('');
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao adicionar movimento');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <>
      <FloatingCard>
        <BalanceDisplay $isPositive={balance >= 0}>
          {formatCurrency(balance)}
        </BalanceDisplay>
        
        <ButtonGroup>
          {!caixaStatus?.aberto ? (
            <Button 
              $variant="success" 
              onClick={handleOpenCaixa}
              disabled={loading}
            >
              Abrir Caixa
            </Button>
          ) : (
            <>
              <Button 
                $variant="primary"
                onClick={() => setShowMovementModal(true)}
                disabled={loading}
              >
                Movimento
              </Button>
              <Button 
                $variant="danger"
                onClick={handleCloseCaixa}
                disabled={loading}
              >
                Fechar
              </Button>
            </>
          )}
        </ButtonGroup>
        
        {error && <div style={{ color: '#dc3545', textAlign: 'center' }}>{error}</div>}
      </FloatingCard>

      {showMovementModal && (
        <>
          <Overlay onClick={() => setShowMovementModal(false)} />
          <MovementModal>
            <h3>Adicionar Movimento</h3>
            <select 
              value={movementType}
              onChange={(e) => setMovementType(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={movementValue}
              onChange={(e) => setMovementValue(e.target.value)}
              placeholder="Valor"
            />
            <ButtonGroup>
              <Button 
                $variant="success"
                onClick={handleAddMovement}
                disabled={loading}
              >
                Confirmar
              </Button>
              <Button 
                $variant="danger"
                onClick={() => setShowMovementModal(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
            </ButtonGroup>
          </MovementModal>
        </>
      )}
    </>
  );
}

export default FloatingBalanceCard; 