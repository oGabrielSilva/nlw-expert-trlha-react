import React from 'react';
import ReactDOM from 'react-dom/client';
import { Startup } from './Startup';
import { Toaster } from 'sonner';
import './resources/css/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Startup />
    <Toaster richColors />
  </React.StrictMode>
);
