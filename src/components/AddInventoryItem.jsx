// src/components/AddInventoryItem.jsx

import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createInventoryItem } from "../graphql/mutations"; // ← Importa la mutación generada

export default function AddInventoryItem() {
  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // Estados para feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validación mínima
    if (!name.trim() || !quantity || !price) {
      setErrorMsg("Los campos Nombre, Cantidad y Precio son obligatorios.");
      return;
    }

    // Construye el objeto input según tu esquema GraphQL
    const input = {
      name: name.trim(),
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      category: category.trim() !== "" ? category.trim() : null,
    };

    try {
      setLoading(true);
      // Llama a la mutación createInventoryItem
      const result = await API.graphql(
        graphqlOperation(createInventoryItem, { input })
      );
      console.log("✅ Producto creado:", result.data.createInventoryItem);

      setSuccessMsg("¡Producto agregado con éxito!");
      // Limpiar campos tras creación
      setName("");
      setQuantity("");
      setPrice("");
      setCategory("");
    } catch (error) {
      console.error("❌ Error al crear producto:", error);
      setErrorMsg("Ocurrió un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Agregar producto al Inventario</h2>

      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Nombre:</label>
          <br />
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Camiseta"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        {/* Campo: Cantidad */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="quantity">Cantidad:</label>
          <br />
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
            min="0"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        {/* Campo: Precio */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="price">Precio:</label>
          <br />
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            min="0"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        {/* Campo: Categoría (opcional) */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="category">Categoría (opcional):</label>
          <br />
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ej. Ropa, Accesorios..."
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        {/* Mensajes de error o éxito */}
        {errorMsg && (
          <p style={{ color: "crimson", marginBottom: "1rem" }}>
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p style={{ color: "green", marginBottom: "1rem" }}>
            {successMsg}
          </p>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: loading ? "#ccc" : "#007acc",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Guardando..." : "Agregar Producto"}
        </button>
      </form>
    </div>
  );
}
