import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Home.jsx'
import { BrowserRouter } from "react-router-dom";

import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const supabase = createClient(
  "https://tmhxuevqpihrsfiaiiaw.supabase.co/",
  "eyJh..."
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SessionContextProvider supabaseClient={supabase}>
        <App />
      </SessionContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
