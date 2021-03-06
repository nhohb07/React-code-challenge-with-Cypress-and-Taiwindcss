import React from 'react';
import { render } from 'react-dom';
import App from './app';
import './styles/globals.css';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);
