import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Productores() {
  const [productores, setProductores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  // Cargar lista de productores al iniciar el componente
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/productores')
      .then((response) => setProductores(response.data))
      .catch((error) => console.error('Hubo un error:', error));
  }, []);

  // Función para agregar un productor
  const agregarProductor = () => {
    if (!nombre || !telefono) {
      alert('Por favor, llena ambos campos antes de agregar.');
      return;
    }

    axios
      .post('http://localhost:5000/api/productores', { nombre, telefono })
      .then(() => {
        // Actualizar la lista de productores después de agregar
        axios
          .get('http://localhost:5000/api/productores')
          .then((response) => {
            setProductores(response.data);
            setNombre('');
            setTelefono('');
          })
          .catch((error) => console.error('Hubo un error al recargar los productores:', error));
      })
      .catch((error) => console.error('Hubo un error al agregar el productor:', error));
  };

  return (
    <div>
      <h2>Productores</h2>

      {/* Lista de productores */}
      <ul>
        {productores.length > 0 ? (
          productores.map((prod) => (
            <li key={prod[0]}>
              {prod[1]} - {prod[2]}
            </li>
          ))
        ) : (
          <p>No hay productores registrados.</p>
        )}
      </ul>

      {/* Formulario para agregar productores */}
      <div>
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
    </div>
  );
}

export default Productores;
