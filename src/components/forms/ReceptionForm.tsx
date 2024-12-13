import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { api } from '../../utils/api';


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
    densidad: '',
    alcohol_85: '',
    antibiotico: '',
    observaciones: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      className="bg-primary-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold mb-4 text-primary-navy">Nueva Recepción</h3>
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
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
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
        <input
          name="densidad"
          type="number"
          step="0.01"
          placeholder="Densidad"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.densidad}
          onChange={handleChange}
        />
        <input
          name="alcohol_85"
          type="number"
          step="0.01"
          placeholder="Alcohol 85%"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.alcohol_85}
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