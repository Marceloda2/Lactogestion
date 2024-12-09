import React, { useState, useEffect } from 'react';

function Productores() {
  const [productores, setProductores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    fetch('/api/productores')
      .then((res) => res.json())
      .then((data) => setProductores(data));
  }, []);

  const agregarProductor = () => {
    fetch('/api/productores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, telefono }),
    })
      .then(() => {
        setNombre('');
        setTelefono('');
        return fetch('/api/productores').then((res) => res.json());
      })
      .then((data) => setProductores(data));
  };

  return (
    <div>
      <h2>Productores</h2>
      <ul>
        {productores.map((prod) => (
          <li key={prod[0]}>
            {prod[1]} - {prod[2]}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <button onClick={agregarProductor}>Agregar</button>
    </div>
  );
}

export default Productores;
