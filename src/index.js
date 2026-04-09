import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
 <QueryClientProvider  client={queryClient} >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    
    </React.StrictMode>
  </QueryClientProvider >
  </Provider>
 
);
reportWebVitals();
