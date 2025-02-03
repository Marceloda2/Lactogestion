import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import { PlusCircle } from 'lucide-react';

interface DispatchFormProps {
  onSuccess: () => void;
  onClose: () => void;
  availableVolume: number;
}

export function DispatchForm({ onSuccess, onClose, availableVolume }: DispatchFormProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const volume = Number(formData.volumen);
    
    if (volume > availableVolume) {
      alert('El volumen de despacho no puede ser mayor que el inventario disponible');
      return;
    }

    try {
      await api.addDispatch(formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding dispatch:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-primary-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold mb-4 text-primary-navy">Nuevo Despacho</h3>
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
          name="hora_salida"
          type="time"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.hora_salida}
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
          max={availableVolume}
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
          name="destino"
          type="text"
          placeholder="Destino"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.destino}
          onChange={handleChange}
          required
        />
        <input
          name="responsable"
          type="text"
          placeholder="Responsable"
          className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
          value={formData.responsable}
          onChange={handleChange}
          required
        />
        <div className="col-span-2 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-primary-navy text-primary-white rounded p-2 flex items-center justify-center gap-2 hover:bg-primary-navy/90 transition-colors"
          >
            <PlusCircle size={20} /> Agregar Despacho
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