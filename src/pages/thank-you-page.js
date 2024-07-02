import React from 'react';
import { useLocation } from 'react-router-dom'; // Importe useLocation
import { PageLayout } from '../components/page-layout';

const ThankYouPage = () => {
  const location = useLocation(); // Use useLocation para obter o estado passado
  const totalAmount = location.state?.totalAmount || 0; // Obtenha o valor total ou defina como 0

  return (
    <PageLayout>
      <div className='thank-you-box'>
        <h2>Agradecemos pela sua escolha!</h2>
        <p>O valor total do pagamento é de: <strong>{totalAmount} EUR</strong></p>
        <p>Por favor, siga as instruções abaixo para efetuar o pagamento:</p>
        <p><strong>NIB:</strong> 1234 5678 9012 3456 7890 1234</p>
        <p>Após o pagamento, entraremos em contato para confirmar o seu pedido.</p>
        <p>Obrigado por escolher os nossos serviços!</p>
      </div>
    </PageLayout>
  );
};

export default ThankYouPage;
