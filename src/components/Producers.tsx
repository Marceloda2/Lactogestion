import React, { useState, useEffect } from 'react';
import { PlusCircle, Eye, EyeOff } from 'lucide-react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import type { Producer } from '../types/milk';

interface ProducerWithPassword extends Producer {
  password: string;
  showPassword?: boolean;
}

interface ProducersProps {
  onSelectProducer: (id: number) => void;
}

export function Producers({ onSelectProducer }: ProducersProps) {
  const [producers, setProducers] = useState<ProducerWithPassword[]>([]);
  const [newProducer, setNewProducer] = useState({
    nombre: '',
    telefono: '',
    password: '',
    codigo: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    loadProducers();
  }, []);

  const loadProducers = async () => {
    try {
      const response = await api.getProducers();
      const formattedProducers = response.data.map((producer: any[]) => ({
        id: producer[0],
        nombre: producer[1],
        telefono: producer[2],
        codigo: producer[3],
        password: producer[4] || '********',
        showPassword: false,
      }));
      setProducers(formattedProducers);
    } catch (error) {
      console.error('Error loading producers:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProducer(prev => ({ ...prev, [name]: value }));
  };

  const addProducer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProducer.nombre && newProducer.password) {
      try {
        await api.addProducer({
          ...newProducer,
          role: 'user',
        });
        await loadProducers();
        setNewProducer({
          nombre: '',
          telefono: '',
          password: '',
          codigo: '',
        });
      } catch (error) {
        console.error('Error adding producer:', error);
      }
    }
  };

  const togglePasswordVisibility = (id: number) => {
    setProducers(prevProducers =>
      prevProducers.map(producer =>
        producer.id === id
          ? { ...producer, showPassword: !producer.showPassword }
          : producer
      )
    );
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-primary-white rounded-lg shadow-lg p-4"
      >
        <h3 className="text-lg font-semibold mb-4 text-primary-navy">Agregar Productor</h3>
        <form onSubmit={addProducer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="codigo"
            placeholder="Código"
            className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
            value={newProducer.codigo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
            value={newProducer.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
            value={newProducer.telefono}
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              className="w-full border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none pr-10"
              value={newProducer.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-accent-gray hover:text-primary-navy"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="bg-primary-navy text-primary-white rounded p-2 flex items-center justify-center gap-2 col-span-full hover:bg-primary-navy/90 transition-colors"
          >
            <PlusCircle size={20} /> Agregar Productor
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-white rounded-lg shadow-lg overflow-hidden"
      >
        <table className="min-w-full">
          <thead>
            <tr className="bg-primary-blue/20">
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Contraseña
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-white divide-y divide-accent-gray">
            {producers.map((producer) => (
              <motion.tr
                key={producer.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-secondary-yellow/5"
              >
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {producer.codigo}
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-primary-navy cursor-pointer hover:text-primary-blue transition-colors"
                  onClick={() => onSelectProducer(producer.id)}
                >
                  {producer.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {producer.telefono}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  <div className="flex items-center gap-2">
                    <span className="font-mono">
                      {producer.showPassword ? producer.password : '********'}
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(producer.id)}
                      className="text-accent-gray hover:text-primary-navy transition-colors"
                    >
                      {producer.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}