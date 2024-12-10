import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recepcion = () => {
  const [recepciones, setRecepciones] = useState([]);
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    volumen: '',
    tanque: '',
    densidad: '',
    alcohol_85: '',
    antibiotico: '',
    observaciones: '',
  });

  // Cargar las recepciones desde el backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/recepcion')
      .then(response => {
        console.log(response.data); // Para verificar que se recibe correctamente
        setRecepciones(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener las recepciones:', error);
      });
  }, []);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para agregar una nueva recepción
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/recepcion', formData)
      .then(response => {
        setRecepciones([...recepciones, response.data]);
        setFormData({
          codigo: '',
          nombre: '',
          volumen: '',
          tanque: '',
          densidad: '',
          alcohol_85: '',
          antibiotico: '',
          observaciones: '',
        });
      })
      .catch(error => {
        console.error('Hubo un error al agregar la recepción:', error);
      });
  };

  return (
    <div>
      <h2>Recepción de Leche</h2>

      {/* Formulario para agregar recepción */}
      <form onSubmit={handleSubmit}>
        <input
          name="codigo"
          type="text"
          placeholder="Código"
          value={formData.codigo}
          onChange={handleChange}
          required
        />
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="volumen"
          type="number"
          placeholder="Volumen"
          value={formData.volumen}
          onChange={handleChange}
          required
        />
        <input
          name="tanque"
          type="text"
          placeholder="Tanque"
          value={formData.tanque}
          onChange={handleChange}
          required
        />
        <input
          name="densidad"
          type="number"
          step="0.01"
          placeholder="Densidad"
          value={formData.densidad}
          onChange={handleChange}
        />
        <input
          name="alcohol_85"
          type="number"
          step="0.01"
          placeholder="Alcohol 85%"
          value={formData.alcohol_85}
          onChange={handleChange}
        />
        <input
          name="antibiotico"
          type="text"
          placeholder="Antibiótico"
          value={formData.antibiotico}
          onChange={handleChange}
        />
        <textarea
          name="observaciones"
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={handleChange}
        />
        <button type="submit">Agregar Recepción</button>
      </form>

      {/* Mostrar recepciones existentes */}
      <ul>
        {recepciones.length > 0 ? (
          recepciones.map((r, index) => (
            <li key={index}>
              {r[1]} - {r[2]} litros - Código: {r[0]} - Tanque: {r[3]} - Densidad: {r[4]} - Alcohol 85%: {r[5]} - Antibiótico: {r[6]} - Observaciones: {r[7]}
            </li>
          ))
        ) : (
          <p>No hay recepciones disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Recepcion;
