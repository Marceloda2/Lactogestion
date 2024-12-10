import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Despacho = () => {
  const [despachos, setDespachos] = useState([]);
  const [formData, setFormData] = useState({
    fecha: '',
    hora_salida: '',
    tanque: '',
    volumen: '',
    temperatura_salida: '',
    destino: '',
    responsable: '',
    firma: '',
    observaciones: '',
  });

  // Cargar los despachos desde el backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/despacho')
      .then(response => {
        console.log(response.data); // Verifica que la data se reciba correctamente
        setDespachos(response.data);
      })
      .catch(error => console.error('Hubo un error al obtener los despachos:', error));
  }, []);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para agregar un nuevo despacho
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/despacho', formData)
      .then(response => {
        setDespachos([...despachos, response.data]);
        setFormData({
          fecha: '',
          hora_salida: '',
          tanque: '',
          volumen: '',
          temperatura_salida: '',
          destino: '',
          responsable: '',
          firma: '',
          observaciones: '',
        });
      })
      .catch(error => console.error('Hubo un error al agregar el despacho:', error));
  };

  return (
    <div>
      <h2>Despacho</h2>

      {/* Formulario para agregar despacho */}
      <form onSubmit={handleSubmit}>
        <input
          name="fecha"
          type="date"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
        <input
          name="hora_salida"
          type="time"
          value={formData.hora_salida}
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
          name="volumen"
          type="number"
          placeholder="Volumen"
          value={formData.volumen}
          onChange={handleChange}
          required
        />
        <input
          name="temperatura_salida"
          type="number"
          placeholder="Temperatura de Salida"
          value={formData.temperatura_salida}
          onChange={handleChange}
          required
        />
        <input
          name="destino"
          type="text"
          placeholder="Destino"
          value={formData.destino}
          onChange={handleChange}
          required
        />
        <input
          name="responsable"
          type="text"
          placeholder="Responsable"
          value={formData.responsable}
          onChange={handleChange}
          required
        />
        <input
          name="firma"
          type="text"
          placeholder="Firma"
          value={formData.firma}
          onChange={handleChange}
          required
        />
        <textarea
          name="observaciones"
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={handleChange}
        />
        <button type="submit">Agregar Despacho</button>
      </form>

      {/* Mostrar despachos existentes */}
      <ul>
        {despachos.length > 0 ? (
          despachos.map((d, index) => (
            <li key={index}>
              {d[1]} - {d[6]} ({d[4]} litros) - Hora de salida: {d[2]} - Tanque: {d[3]} - Responsable: {d[7]} - Firma: {d[8]} - Observaciones: {d[9]}
            </li>
          ))
        ) : (
          <p>No hay despachos disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Despacho;
