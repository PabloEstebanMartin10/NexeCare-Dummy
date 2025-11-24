// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import App from "./App.jsx";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "./index.css"; // asegúrate de importar tu CSS global aquí

const supabase = createClient(
  "https://tmhxuevqpihrsfiaiiaw.supabase.co/",
  "TU_SUPABASE_KEY_AQUI"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Primero el provider global */}
    <SessionContextProvider supabaseClient={supabase}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agenda" element={<App />} />
        </Routes>
      </BrowserRouter>
    </SessionContextProvider>
  </StrictMode>
);
