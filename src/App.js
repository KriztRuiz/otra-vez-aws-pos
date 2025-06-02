// src/App.js

import React from "react";
import AddInventoryItem from "./components/AddInventoryItem";

function App() {
  return (
    <div>
      {/* Header de la aplicación */}
      <header
        style={{
          backgroundColor: "#007acc",
          padding: "1rem",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1>Mi POS – Inventario</h1>
      </header>

      {/* Contenedor principal */}
      <main>
        <AddInventoryItem />
      </main>
    </div>
  );
}

export default App;
