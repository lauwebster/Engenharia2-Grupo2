import { FooterBody, LogoFooter, DivTextos, LogoCarim, DivLogos, LogoRedes, LinkRedes } from './footer-style';
import { useEffect, useState } from "react";
import parametrizationService from "../../services/parametrizationService";
import LogoYoutube from '../imagens/youtube-100x100.png';
import LogoFacebook from '../imagens/facebook-100x100.png';
import LogoInstagram from '../imagens/instagram-100x100.png';

function Footer() {
    const [parametrizacao, setParametrizacao] = useState(null);

    useEffect(() => {
        const fetchParametrizacao = async () => {
            try {
                const response = await parametrizationService.getParametrization();
                setParametrizacao(response);
            } catch (error) {
                console.error('Error fetching parametrization:', error);
            }
        };

        fetchParametrizacao();
    }, []);

    return (
        <FooterBody>
            <LogoCarim>
                <LogoFooter 
                    src={parametrizacao?.logo_url || "https://carimprudente.com.br/wp-content/uploads/2024/05/carim-logo-branco.png"}
                    alt={parametrizacao?.nome || "Logo"}
                />
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
                <p>{parametrizacao?.endereco || "Rua Mario Simões de Souza, 36, Presidente Prudente, SP"}</p>
                <p>{parametrizacao?.telefone && `Telefone: ${parametrizacao.telefone}`}</p>
                <p>{parametrizacao?.email && `Email: ${parametrizacao.email}`}</p>
                <p>© 2024 {parametrizacao?.nome || "Carim"}</p>
            </DivTextos>
        </FooterBody>
    );
}

export default Footer;