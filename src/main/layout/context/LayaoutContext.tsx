import  { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo del contexto
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Crear el contexto
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Componente proveedor del contexto
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
