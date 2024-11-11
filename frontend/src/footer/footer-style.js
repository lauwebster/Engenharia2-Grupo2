import styled from "styled-components";

export const FooterBody = styled.div`
    display: flex;
    justify-content: space-between; 
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #191919;
    text-align: center;
    padding: 1.5%;
    z-index: 50;
    position: fixed;
    align-items: center;
`
export const LogoFooter = styled.img`
    max-width: 25%;
`
export const DivTextos = styled.div`
    color: #ffff;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
`
export const LogoCarim = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex: 2;
    gap: 20%;
`

export const DivLogos = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
`
export const LogoRedes = styled.img`
    max-width: 70%;
`

export const LinkRedes = styled.a`
    text-decoration: none;
`