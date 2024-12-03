import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/apiService';
import authService from '../../../services/authService';
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import {
  PageContainer,
  MainContent,
  HeaderContainer,
  HeaderContent,
  HeaderTitle,
  HeaderDescription,
  HeaderActions,
  SectorGrid,
  SectorCard,
  Button,
  TransferModal,
  Overlay,
  ErrorBanner
} from './sector-funds-styles';
import eventService from '../../../services/eventService';

function SectorFunds() {
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);
  const [availableDonations, setAvailableDonations] = useState([]);
  const [selectedDonations, setSelectedDonations] = useState([]);
  const [error, setError] = useState('');
  const [isCaixaSetor, setIsCaixaSetor] = useState(false);

  useEffect(() => {
    fetchSectors();
  }, []);

  useEffect(() => {
    if (selectedSector) {
      setIsCaixaSetor(selectedSector.nome.toLowerCase() === 'caixa');
    }
  }, [selectedSector]);

  const fetchSectors = async () => {
    try {
      const sectorsData = await apiService.getSetores();
      setSectors(sectorsData);
    } catch (err) {
      setError('Erro ao carregar setores');
    }
  };

  const fetchAvailableDonations = async () => {
    try {
      const donations = await apiService.getDonations();
      const confirmedDonations = donations.filter(d => d.status === 'confirmada');
      setAvailableDonations(confirmedDonations);
    } catch (err) {
      setError('Erro ao carregar doações disponíveis');
    }
  };

  const handleOpenTransferModal = (sector) => {
    setSelectedSector(sector);
    setSelectedDonations([]);
    fetchAvailableDonations();
    setShowTransferModal(true);
  };

  const handleDonationSelection = (donation) => {
    setSelectedDonations(prev => {
      const isSelected = prev.find(d => d.id === donation.id);
      if (isSelected) {
        return prev.filter(d => d.id !== donation.id);
      }
      return [...prev, donation];
    });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (selectedDonations.length === 0) {
      setError('Selecione pelo menos uma doação para realizar o repasse');
      return;
    }

    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Usuário não autenticado');
      }

      const totalValue = selectedDonations.reduce((sum, d) => sum + Number(d.valor), 0);

      if (isCaixaSetor) {
        const caixaStatus = await apiService.getCaixaStatus();
        
        if (!caixaStatus.aberto) {
          throw new Error('É necessário abrir o caixa antes de realizar o repasse');
        }

        await apiService.addCaixaMovement(caixaStatus.id, {
          tipo_movimento: 'entrada',
          valor: totalValue,
          descricao: `Repasse de doações para Caixa`,
          responsavel_id: currentUser.id
        });
      }

      await apiService.createRepasse({
        setor_id: selectedSector.id,
        doacoes: selectedDonations.map(d => d.id),
        responsavel_id: currentUser.id,
        valor: totalValue,
        observacoes: `Repasse de ${selectedDonations.length} doações`
      });

      setShowTransferModal(false);
      fetchSectors();
      
      if (isCaixaSetor) {
        eventService.emit('BALANCE_UPDATED');
      }
    } catch (err) {
      setError(err.message || 'Erro ao realizar repasse');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleCloseModal = () => {
    setShowTransferModal(false);
    setSelectedSector(null);
    setSelectedDonations([]);
    setError('');
  };

  return (
    <PageContainer>
      <Navbar />
      <MainContent>
        <HeaderContainer>
          <HeaderContent>
            <HeaderTitle>Gestão de Verbas por Setor</HeaderTitle>
            <HeaderDescription>
              Gerencie e acompanhe a distribuição de recursos entre os diferentes setores. 
              Realize repasses de doações e mantenha o controle dos fundos disponíveis para cada área.
            </HeaderDescription>
            <HeaderActions>
              <Button onClick={() => navigate('/sectors/new')}>Novo Setor</Button>
            </HeaderActions>
          </HeaderContent>
        </HeaderContainer>

        {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

        <SectorGrid>
          {sectors
            .sort((a, b) => {
              if (a.nome.toLowerCase() === 'caixa') return -1;
              if (b.nome.toLowerCase() === 'caixa') return 1;
              return a.nome.localeCompare(b.nome);
            })
            .map(sector => (
              <SectorCard key={sector.id}>
                <h3>{sector.nome}</h3>
                <p>{sector.descricao}</p>
                <p><strong>Saldo: </strong>{formatCurrency(sector.saldo)}</p>
                {sector.nome.toLowerCase() !== 'caixa' && (
                  <Button onClick={() => handleOpenTransferModal(sector)}>
                    Realizar Repasse
                  </Button>
                )}
                {sector.nome.toLowerCase() === 'caixa' && (
                  <Button onClick={() => handleOpenTransferModal(sector)}>
                    Receber Doações
                  </Button>
                )}
              </SectorCard>
            ))}
        </SectorGrid>

        {showTransferModal && (
          <>
            <Overlay onClick={handleCloseModal} />
            <TransferModal>
              <h2>{isCaixaSetor ? 'Receber Doações' : 'Realizar Repasse'}</h2>
              <h3>{selectedSector.nome}</h3>
              
              <div className="info-section">
                <p><strong>Atenção:</strong> Este repasse irá:</p>
                <ul>
                  {isCaixaSetor && <li>Registrar uma entrada no caixa</li>}
                  <li>Atualizar o saldo do setor</li>
                  <li>Marcar as doações como repassadas</li>
                </ul>
              </div>
              
              <div className="donations-list">
                <h4>Doações Disponíveis</h4>
                {availableDonations.length === 0 ? (
                  <p>Não há doações confirmadas disponíveis para repasse</p>
                ) : (
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {availableDonations.map(donation => (
                      <div 
                        key={donation.id}
                        className={`donation-item ${
                          selectedDonations.find(d => d.id === donation.id) ? 'selected' : ''
                        }`}
                        onClick={() => handleDonationSelection(donation)}
                      >
                        <input 
                          type="checkbox"
                          checked={selectedDonations.find(d => d.id === donation.id)}
                          onChange={() => handleDonationSelection(donation)}
                        />
                        <span>Doação #{donation.id}</span>
                        <span>{formatCurrency(donation.valor)}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="summary">
                  <h4>Total Selecionado:</h4>
                  <strong>
                    {formatCurrency(
                      selectedDonations.reduce((sum, d) => sum + Number(d.valor), 0)
                    )}
                  </strong>
                </div>
              </div>

              {error && <ErrorBanner>{error}</ErrorBanner>}
              
              <div style={{ marginTop: '20px' }}>
                <Button 
                  type="button" 
                  onClick={handleTransfer}
                  disabled={selectedDonations.length === 0}
                >
                  Confirmar Repasse
                </Button>
                <Button 
                  type="button" 
                  onClick={handleCloseModal}
                  style={{ marginLeft: '10px', background: '#6c757d' }}
                >
                  Cancelar
                </Button>
              </div>
            </TransferModal>
          </>
        )}
      </MainContent>
      <Footer />
    </PageContainer>
  );
}

export default SectorFunds; 