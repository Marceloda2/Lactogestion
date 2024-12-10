import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { api } from '../utils/api';

interface Reception {
  id: number;
  codigo: string;
  nombre: string;
  volumen: number;
  tanque: string;
  densidad: number;
  alcohol_85: number;
  antibiotico: string;
  observaciones: string;
}

export function Reception() {
  const [receptions, setReceptions] = useState<Reception[]>([]);
  const [newReception, setNewReception] = useState({
    codigo: '',
    nombre: '',
    volumen: '',
    tanque: '',
    densidad: '',
    alcohol_85: '',
    antibiotico: '',
    observaciones: '',
  });

  useEffect(() => {
    loadReceptions();
  }, []);

  const loadReceptions = async () => {
    try {
      const response = await api.getReceptions();
      const formattedReceptions = response.data.map((reception: any[]) => ({
        id: reception[0],
        codigo: reception[1],
        nombre: reception[2],
        volumen: reception[3],
        tanque: reception[4],
        densidad: reception[5],
        alcohol_85: reception[6],
        antibiotico: reception[7],
        observaciones: reception[8],
      }));
      setReceptions(formattedReceptions);
    } catch (error) {
      console.error('Error loading receptions:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReception({ ...newReception, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addReception(newReception);
      await loadReceptions();
      setNewReception({
        codigo: '',
        nombre: '',
        volumen: '',
        tanque: '',
        densidad: '',
        alcohol_85: '',
        antibiotico: '',
        observaciones: '',
      });
    } catch (error) {
      console.error('Error adding reception:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Nueva Recepción</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="codigo"
            type="text"
            placeholder="Código"
            className="border rounded p-2"
            value={newReception.codigo}
            onChange={handleChange}
            required
          />
          <input
            name="nombre"
            type="text"
            placeholder="Nombre"
            className="border rounded p-2"
            value={newReception.nombre}
            onChange={handleChange}
            required
          />
          <input
            name="volumen"
            type="number"
            placeholder="Volumen"
            className="border rounded p-2"
            value={newReception.volumen}
            onChange={handleChange}
            required
          />
          <input
            name="tanque"
            type="text"
            placeholder="Tanque"
            className="border rounded p-2"
            value={newReception.tanque}
            onChange={handleChange}
            required
          />
          <input
            name="densidad"
            type="number"
            step="0.01"
            placeholder="Densidad"
            className="border rounded p-2"
            value={newReception.densidad}
            onChange={handleChange}
          />
          <input
            name="alcohol_85"
            type="number"
            step="0.01"
            placeholder="Alcohol 85%"
            className="border rounded p-2"
            value={newReception.alcohol_85}
            onChange={handleChange}
          />
          <input
            name="antibiotico"
            type="text"
            placeholder="Antibiótico"
            className="border rounded p-2"
            value={newReception.antibiotico}
            onChange={handleChange}
          />
          <textarea
            name="observaciones"
            placeholder="Observaciones"
            className="border rounded p-2"
            value={newReception.observaciones}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white rounded p-2 flex items-center justify-center gap-2 col-span-full"
          >
            <PlusCircle size={20} /> Agregar Recepción
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volumen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Densidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alcohol 85%
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {receptions.map((reception) => (
              <tr key={reception.id}>
                <td className="px-6 py-4 whitespace-nowrap">{reception.codigo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reception.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reception.volumen} L</td>
                <td className="px-6 py-4 whitespace-nowrap">{reception.tanque}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reception.densidad}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reception.alcohol_85}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}