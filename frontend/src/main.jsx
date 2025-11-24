import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import App from './App.jsx'
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import './index.css';
import './App.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


// Configuración Supabase
const SUPABASE_URL = "https://tmhxuevqpihrsfiaiiaw.supabase.co/";
const SUPABASE_ANON_KEY = "TU_SUPABASE_KEY_AQUI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,      // importante para mantener sesión
    autoRefreshToken: true,    // refresca el token automáticamente
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SessionContextProvider supabaseClient={supabase}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agenda" element={<App />} />
        </Routes>
      </SessionContextProvider>
    </BrowserRouter>
  </StrictMode>
);
