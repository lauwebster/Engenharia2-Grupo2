import styled from "styled-components";

export const FooterBody = styled.footer`
    background-color: #a1238c;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1rem;
    }
`
export const LogoFooter = styled.img`
    max-width: 150px;
    height: auto;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`
export const DivTextos = styled.div`
    color: #ffffff;

    h2 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

    p {
        margin: 0.25rem 0;
        color: #cccccc;
        font-size: 0.85rem;
        line-height: 1.3;
    }

    p:last-child {
        margin-top: 1rem;
        font-size: 0.8rem;
        color: #999999;
    }
`
export const LogoCarim = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
`

export const DivLogos = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`
export const LogoRedes = styled.img`
    width: 32px;
    height: 32px;
    transition: transform 0.3s ease;
    filter: brightness(0) invert(1);
`

export const LinkRedes = styled.a`
    &:hover ${LogoRedes} {
        transform: scale(1.1);
    }
`