import styled from "styled-components";


export const MenuBody = styled.div`
  background-color: #F0E2B5;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const DivCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`

export const StyledWrapper = styled.div`
  .card {
    box-sizing: border-box;
    width: 190px;
    height: 254px;
    background: #f8f1da;
    border: 1px solid white;
    box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-weight: bolder;
    color: black;
    z-index: 50;
    gap: 2%;
  }

  .card:hover {
    border: 1px solid black;
    transform: scale(1.05);
  }

  .card:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }`;

export const DivTitulo = styled.div`
  position: absolute;   /* Posiciona a DivTitulo em relação a MainDiv */
  top: 50%;             /* Ajusta a posição vertical para o centro de MainDiv */
  left: 50%;            /* Ajusta a posição horizontal para o centro de MainDiv */
  transform: translate(-50%, -50%); /* Centraliza exatamente no meio */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.8); /* Exemplo de fundo semi-transparente */
  padding: 10px;
  border-radius: 5px;
`;

export const DivCentral = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;  /* Define posição relativa para o posicionamento de elementos filhos */
  width: 300px;         /* Exemplo de largura */
  height: 300px;        /* Exemplo de altura */
  background-color: lightgray;
`