import styled from "styled-components";

export const SectionBody = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #a1238c;
    padding: 20px 40px;
    width: 100%;
`;

export const LogoCarim = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const NavButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    .logout-button {
        background-color: transparent;
        color: white;
        border: 1px solid white;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;

        &:hover {
            background-color: white;
            color: #a1238c;
        }
    }
`;

export const Imagem = styled.img`
    max-width: 200px;
    max-height: 40px;
    width: auto;
    height: auto;
`;

export const TituloMenu = styled.a`
    font-weight: 400;
    font-size: 20px;
    text-decoration: none;
    color: white;
`;