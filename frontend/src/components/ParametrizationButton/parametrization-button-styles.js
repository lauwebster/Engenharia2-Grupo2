import styled from 'styled-components';

export const ButtonContainer = styled.div`
    display: inline-block;
`;

export const StyledButton = styled.button`
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
        color: #1a1a1a;
    }
`;