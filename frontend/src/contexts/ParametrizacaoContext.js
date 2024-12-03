import { createContext, useState, useContext, useEffect } from "react";
import parametrizationService from "../services/parametrizationService";

const ParametrizacaoContext = createContext({});

export function ParametrizacaoProvider({ children }) {
  const [parametrizacao, setParametrizacao] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkParametrizacao = async () => {
    try {
      const response = await parametrizationService.getParametrization();
      setParametrizacao(response);
    } catch (error) {
      console.error("Erro ao verificar parametrização:", error);
      setParametrizacao(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkParametrizacao();
  }, []);

  return (
    <ParametrizacaoContext.Provider
      value={{ parametrizacao, loading, checkParametrizacao }}
    >
      {children}
    </ParametrizacaoContext.Provider>
  );
}

export function useParametrizacao() {
  const context = useContext(ParametrizacaoContext);
  if (!context) {
    throw new Error(
      "useParametrizacao must be used within a ParametrizacaoProvider"
    );
  }
  return context;
}