import { FooterBody, LogoFooter, DivTextos, LogoCarim, DivLogos, LogoRedes, LinkRedes } from './footer-style';
import LogoYoutube from '../imagens/youtube-100x100.png';
import LogoFacebook from '../imagens/facebook-100x100.png';
import LogoInstagram from '../imagens/instagram-100x100.png';

function Footer() {
    return (
      <FooterBody>
          <LogoCarim>
            <LogoFooter src={"https://carimprudente.com.br/wp-content/uploads/2024/05/carim-logo-branco.png"}></LogoFooter>
            <DivLogos>
              <LinkRedes href='https://www.facebook.com/carimpprudente/' target='blank'>
                <LogoRedes src={LogoFacebook}></LogoRedes>
              </LinkRedes>
              <LinkRedes href='https://www.instagram.com/carimpprudente/' target='blank'>
                <LogoRedes src={LogoInstagram}></LogoRedes>
              </LinkRedes>
              <LinkRedes href='https://www.youtube.com/@carimpprudente' target='blank'>
                <LogoRedes src={LogoYoutube}></LogoRedes>
              </LinkRedes>
            </DivLogos>
          </LogoCarim>
        <DivTextos>
          <h2>Endereço</h2>
          <p> Rua Mario Simões de Souza, 36, Presidente Prudente, SP</p>
          <p>© 2024 Carim</p>
        </DivTextos>
      </FooterBody>
    );
}

export default Footer;