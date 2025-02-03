import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import api from '../../utils/api';

interface ReceptionFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export function ReceptionForm({ onSuccess, onClose }: ReceptionFormProps) {
  const [formData, setFormData] = useState({
    fecha: '',
    hora_entrada: '',
    nombre: '',
    volumen: '',
    tanque: '',
    densidad: '0',
    alcohol_85: '0',
    antibiotico: 'no',
    temperatura: '',
    observaciones: '',
  });

  const [producers, setProducers] = useState([]);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await api.getProducers();
        setProducers(response.data);
      } catch (error) {
        console.error('Error fetching producers:', error);
      }
    };

    fetchProducers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? (name === 'alcohol_85' ? '85' : name === 'densidad' ? '100' : 'si') : 'no') : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addReception(formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding reception:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-primary-white rounded-lg shadow-lg p-6 w-full max-w-lg"
    >
      <h3 className="text-lg font-semibold text-primary-navy">Nueva Recepción</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="fecha"
          type="date"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
        <input
          name="hora_entrada"
          type="time"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.hora_entrada}
          onChange={handleChange}
          required
        />
        <select
          name="nombre"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.nombre}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un productor</option>
          {producers.map((producer: any) => (
            <option key={producer[0]} value={producer[1]}>
              {producer[1]}
            </option>
          ))}
        </select>
        <input
          name="volumen"
          type="number"
          placeholder="Volumen (L)"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.volumen}
          onChange={handleChange}
          required
        />
        <input
          name="tanque"
          type="text"
          placeholder="Tanque"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.tanque}
          onChange={handleChange}
          required
        />
        <label className="flex items-center">
          <input
            name="densidad"
            type="checkbox"
            className="mr-2"
            checked={formData.densidad === '100'}
            onChange={handleChange}
          />
          Densidad 100
        </label>
        <label className="flex items-center">
          <input
            name="alcohol_85"
            type="checkbox"
            className="mr-2"
            checked={formData.alcohol_85 === '85'}
            onChange={handleChange}
          />
          Alcohol 85%
        </label>
        <label className="flex items-center">
          <input
            name="antibiotico"
            type="checkbox"
            className="mr-2"
            checked={formData.antibiotico === 'si'}
            onChange={handleChange}
          />
          Antibiótico
        </label>
        <input
          name="temperatura"
          type="number"
          step="0.1"
          placeholder="Temperatura (°C)"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.temperatura}
          onChange={handleChange}
        />
        <div className="col-span-2 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-primary-navy text-primary-white rounded p-2 flex items-center justify-center gap-2 hover:bg-primary-navy/90 transition-colors"
          >
            <PlusCircle size={20} /> Agregar Recepción
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-accent-gray text-primary-navy rounded p-2 hover:bg-accent-gray/80 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </motion.div>
  );
}