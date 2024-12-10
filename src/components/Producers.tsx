import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { api } from '../utils/api';

interface Producer {
  id: number;
  nombre: string;
  telefono: string;
}

export function Producers() {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [newProducer, setNewProducer] = useState({
    nombre: '',
    telefono: '',
  });

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
      }));
      setProducers(formattedProducers);
    } catch (error) {
      console.error('Error loading producers:', error);
    }
  };

  const addProducer = async () => {
    if (newProducer.nombre && newProducer.telefono) {
      try {
        await api.addProducer(newProducer);
        await loadProducers();
        setNewProducer({ nombre: '', telefono: '' });
      } catch (error) {
        console.error('Error adding producer:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Agregar Productor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="border rounded p-2"
            value={newProducer.nombre}
            onChange={(e) => setNewProducer({ ...newProducer, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="border rounded p-2"
            value={newProducer.telefono}
            onChange={(e) => setNewProducer({ ...newProducer, telefono: e.target.value })}
          />
          <button
            onClick={addProducer}
            className="bg-purple-500 text-white rounded p-2 flex items-center justify-center gap-2 col-span-full"
          >
            <PlusCircle size={20} /> Agregar Productor
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teléfono
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {producers.map((producer) => (
              <tr key={producer.id}>
                <td className="px-6 py-4 whitespace-nowrap">{producer.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{producer.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}