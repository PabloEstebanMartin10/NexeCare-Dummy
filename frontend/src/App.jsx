import { useState } from "react";
import "./App.css";
import Medication from "./Medication";
import MedicationAppointment from "./medicalAppointment.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <Medication />
      <MedicationAppointment />
    </div>
  );
}

export default App;
