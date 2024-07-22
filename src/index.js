import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import "./styles/styles.css";

console.log('Auth0 Domain:', process.env.REACT_APP_AUTH0_DOMAIN);
console.log('Auth0 Client ID:', process.env.REACT_APP_AUTH0_CLIENT_ID);
console.log('Auth0 Callback URL:', process.env.REACT_APP_AUTH0_CALLBACK_URL);
console.log('API Server URL:', process.env.REACT_APP_API_SERVER_URL);

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
 <React.StrictMode>
   <BrowserRouter>
     <Auth0ProviderWithNavigate
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}>
       <App />
     </Auth0ProviderWithNavigate>
   </BrowserRouter>
 </React.StrictMode>
);
