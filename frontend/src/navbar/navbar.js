import { SectionBody, LogoCarim, Imagem, TituloMenu} from "./navbar-styles";

function Navbar() {
    return (
        <SectionBody>
            <LogoCarim>
                <TituloMenu href="localhost:3000/menu">
                <Imagem src={"https://carimprudente.com.br/wp-content/uploads/2024/05/carim-logo-branco.png"}></Imagem>
                </TituloMenu>
            </LogoCarim>
        </SectionBody>
    );
}

export default Navbar;