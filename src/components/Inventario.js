import React, { useState, useEffect } from 'react';

function Inventario() {
  const [inventarios, setInventarios] = useState([]);
  const [productor_id, setProductorId] = useState('');
  const [fecha, setFecha] = useState('');
  const [litros, setLitros] = useState('');
  const [cliente, setCliente] = useState('');

  // Cargar los inventarios desde el backend
  useEffect(() => {
    fetch('/api/inventario')
      .then((res) => res.json())
      .then((data) => setInventarios(data));
  }, []);

  // Función para agregar un nuevo inventario
  const agregarInventario = () => {
    fetch('/api/inventario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productor_id, fecha, litros, cliente }),
    })
      .then(() => {
        setProductorId('');
        setFecha('');
        setLitros('');
        setCliente('');
        // Recargar inventarios después de agregar uno nuevo
        return fetch('/api/inventario').then((res) => res.json());
      })
      .then((data) => setInventarios(data));
  };

  return (
    <div>
      <h2>Inventario</h2>
      
      {/* Mostrar inventarios existentes */}
      <ul>
        {inventarios.map((inv) => (
          <li key={inv[0]}>
            {inv[2]} litros - Fecha: {inv[3]} - Cliente: {inv[4]} - Productor ID: {inv[1]}
          </li>
        ))}
      </ul>
      
      {/* Formulario para agregar inventario */}
      <div>
        <input
          type="text"
          placeholder="Productor ID"
          value={productor_id}
          onChange={(e) => setProductorId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <input
          type="number"
          placeholder="Litros"
          value={litros}
          onChange={(e) => setLitros(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        <button onClick={agregarInventario}>Agregar Inventario</button>
      </div>
    </div>
  );
}

export default Inventario;
