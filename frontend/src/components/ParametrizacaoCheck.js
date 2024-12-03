import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import parametrizationService from "../services/parametrizationService";

export function ParametrizacaoCheck({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isParametrizationRoute =
    location.pathname === "/parametrization" ||
    location.pathname === "/parametrization/edit";

  const [loading, setLoading] = useState(true);
  const [parametrizacao, setParametrizacao] = useState(null);

  useEffect(() => {
    const fetchParametrizacao = async () => {
      try {
        const response = await parametrizationService.getParametrization();
        setParametrizacao(response);
      } catch (error) {
        console.error(error);
        setParametrizacao(null);
      } finally {
        setLoading(false);
      }
    };

    fetchParametrizacao();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!parametrizacao && !isParametrizationRoute) {
        navigate("/parametrization", { replace: true });
      }
    }
  }, [loading, parametrizacao, isParametrizationRoute, navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return children;
}
