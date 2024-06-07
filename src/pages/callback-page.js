import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const CallbackPage = () => {
  const { handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await handleRedirectCallback();
        navigate('/'); // Redireciona para a página inicial ou outra página desejada
      } catch (error) {
        console.error('Erro de autenticação:', error);
      }
    };

    processCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="page-layout">
      <div className="page-layout__content">
        <p>Processing login...</p>
      </div>
    </div>
  );
};
