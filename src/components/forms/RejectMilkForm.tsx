import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import type { MilkReception } from '../../types/milk';

interface RejectMilkFormProps {
  reception: MilkReception;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export function RejectMilkForm({ reception, onSubmit, onClose }: RejectMilkFormProps) {
  const [formData, setFormData] = useState({
    motivo: '',
    observaciones: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      motivo: formData.motivo,
      observaciones: formData.observaciones,
      fecha: reception.fecha,
      hora: reception.hora,
      reception_id: reception.id
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-primary-white rounded-lg shadow-lg p-6 w-full max-w-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary-navy">Rechazar Recepción</h3>
        <button
          onClick={onClose}
          className="text-accent-gray hover:text-primary-navy transition-colors"
        >
          <XCircle size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary-navy mb-1">
            Motivo de rechazo
          </label>
          <textarea
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            className="w-full border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-navy mb-1">
            Observaciones
          </label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            className="w-full border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
            rows={3}
            required
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-accent-red text-primary-white rounded p-2 hover:bg-accent-red/90 transition-colors"
          >
            Confirmar Rechazo
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