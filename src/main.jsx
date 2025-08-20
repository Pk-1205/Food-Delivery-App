import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';
import { AuthProvider } from './context/AuthProvider.jsx'; // ✅ make sure this file exists

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </AuthProvider>
  </BrowserRouter>
);
