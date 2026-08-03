import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { BudgetProvider } from './context/BudgetContext';
import { SettingsProvider } from './context/SettingsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ExpenseProvider>
          <BudgetProvider>
            <SettingsProvider>
              <App />
              <Toaster position="top-right" toastOptions={{ duration: 3000, style: { fontFamily: 'Inter, sans-serif', borderRadius: '12px', padding: '12px 16px' } }} />
            </SettingsProvider>
          </BudgetProvider>
        </ExpenseProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);