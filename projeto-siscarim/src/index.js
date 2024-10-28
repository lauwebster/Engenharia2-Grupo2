import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FormLogin } from './login/login.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormLogin />
  </React.StrictMode>
);