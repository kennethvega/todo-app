import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserProvider from './context/AuthContext';
import 'tippy.js/dist/tippy.css';
import './styles/global.css';
import { Provider } from 'urql';
import { createClient, dedupExchange, fetchExchange, cacheExchange } from '@urql/core';

const client = createClient({
  url: 'https://todoappv1.onrender.com/query',
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
  requestPolicy: 'cache-first',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>,
);
