import React from "react";
import Footer from '../footer/footer';
import Navbar from '../navbar/navbar';
import { DivCard, MenuBody, StyledWrapper} from "./menu-styles";
import Button from 'react-bootstrap/Button';

function Menu(){
    return(
        <MenuBody>
            <Navbar></Navbar>
            <DivCard>
                <StyledWrapper>
                    <div className="card">
                        <Button variant="light">Gerenciar </Button>{' '}
                        <Button variant="light">Encaminhar</Button>{' '}
                    </div>
                </StyledWrapper>
            </DivCard>
            <Footer></Footer>
        </MenuBody>
    )
}

export default Menu;