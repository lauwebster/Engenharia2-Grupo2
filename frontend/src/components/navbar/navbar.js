import { SectionBody, LogoCarim, Imagem, TituloMenu, NavButtons } from "./navbar-styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import parametrizationService from "../../services/parametrizationService";
import authService from "../../services/authService";
import ParametrizationButton from "../ParametrizationButton/ParametrizationButton";

function Navbar() {
    const navigate = useNavigate();
    const [parametrizacao, setParametrizacao] = useState(null);
    const isAdmin = authService.isAdmin();

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

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handleLogout = () => {
        authService.logout();
        navigate("/");
    };

    return (
        <SectionBody>
            <LogoCarim>
                <TituloMenu href="/" onClick={handleLogoClick}>
                    <Imagem 
                        src={parametrizacao?.logo_url || "https://carimprudente.com.br/wp-content/uploads/2024/05/carim-logo-branco.png"}
                        alt={parametrizacao?.nome || "Logo"}
                    />
                </TituloMenu>
            </LogoCarim>
            <NavButtons>
                <ParametrizationButton isAdmin={isAdmin} />
                <button onClick={handleLogout} className="logout-button">Sair</button>
            </NavButtons>
        </SectionBody>
    );
}

export default Navbar;