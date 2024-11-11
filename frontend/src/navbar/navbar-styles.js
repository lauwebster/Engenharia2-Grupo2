import styled from "styled-components";

export const SectionBody = styled.div`
    background-color: #a1238c;
    position: fixed;
    top: 0;
    width: 100%;
    padding-left: 15px;
    z-index: 50;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 3%;
`
export const LogoCarim = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
`
export const Imagem = styled.img`
    max-width: 300px;
    max-height: 80px;
    width: auto;
    height: auto;
`
export const DivHome = styled.div`
    display: flex;
    align-items: flex-start;
    padding-top: 30px;
    color: #1af0e1;
    gap: 9%;
    flex-direction: row;
    justify-content: center;
`
export const IconeHome = styled.img`
    max-width: 100%;
`

export const TituloMenu = styled.a`
    font-weight: 400;
    font-size: 30px;
    color: #191919; !important;
    text-decoration: none;
    color: white;
`