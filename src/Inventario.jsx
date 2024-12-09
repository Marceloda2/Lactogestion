// Inventario.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Inventario() {
  const [inventarios, setInventarios] = useState([]);
  const [productor_id, setProductorId] = useState('');
  const [fecha, setFecha] = useState('');
  const [litros, setLitros] = useState('');
  const [cliente, setCliente] = useState('');

  // Cargar los inventarios desde el backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/inventario')
      .then(response => {
        setInventarios(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los inventarios:', error);
      });
  }, []);

  // Función para agregar un nuevo inventario
  const agregarInventario = () => {
    axios.post('http://localhost:5000/api/inventario', {
      productor_id,
      fecha,
      litros,
      cliente
    })
    .then(response => {
      console.log(response.data);
      setProductorId('');
      setFecha('');
      setLitros('');
      setCliente('');
      // Recargar inventarios después de agregar uno nuevo
      axios.get('http://localhost:5000/api/inventario')
        .then(response => {
          setInventarios(response.data);
        });
    })
    .catch(error => {
      console.error('Hubo un error al agregar el inventario:', error);
    });
  };

  return (
    <div>
      <h2>Inventario de Leche</h2>
  
      {/* Mostrar inventarios existentes */}
      <ul>
        {inventarios.length > 0 ? (
          inventarios.map((inv) => (
            <li key={inv[0]}>
              {inv[2]} litros - Fecha: {inv[3]} - Cliente: {inv[4]} - Productor ID: {inv[1]}
            </li>
          ))
        ) : (
          <p>No hay inventarios disponibles.</p>
        )}
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
