import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Home.jsx'


// 1. Importamos el cliente de supabase
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

// 2. Creamos la constante del cliente, URL + API KEY
const supabase = createClient(
  "https://tmhxuevqpihrsfiaiiaw.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaHh1ZXZxcGlocnNmaWFpaWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1OTYzNTMsImV4cCI6MjA3OTE3MjM1M30.tQUtE5ATLgWlg3ewBM5fYjvPzpdijgXubcKp7lLHHW0"
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. Envolvemos la App y pasamos: */}
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </StrictMode>,
)

