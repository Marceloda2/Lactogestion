import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { api } from '../utils/api';

interface Dispatch {
  id: number;
  fecha: string;
  hora_salida: string;
  tanque: string;
  volumen: number;
  temperatura_salida: number;
  destino: string;
  responsable: string;
  firma: string;
  observaciones: string;
}

export function Dispatch() {
  const [dispatches, setDispatches] = useState<Dispatch[]>([]);
  const [newDispatch, setNewDispatch] = useState({
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

  useEffect(() => {
    loadDispatches();
  }, []);

  const loadDispatches = async () => {
    try {
      const response = await api.getDispatches();
      const formattedDispatches = response.data.map((dispatch: any[]) => ({
        id: dispatch[0],
        fecha: dispatch[1],
        hora_salida: dispatch[2],
        tanque: dispatch[3],
        volumen: dispatch[4],
        temperatura_salida: dispatch[5],
        destino: dispatch[6],
        responsable: dispatch[7],
        firma: dispatch[8],
        observaciones: dispatch[9],
      }));
      setDispatches(formattedDispatches);
    } catch (error) {
      console.error('Error loading dispatches:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDispatch({ ...newDispatch, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addDispatch(newDispatch);
      await loadDispatches();
      setNewDispatch({
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
    } catch (error) {
      console.error('Error adding dispatch:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Nuevo Despacho</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="fecha"
            type="date"
            className="border rounded p-2"
            value={newDispatch.fecha}
            onChange={handleChange}
            required
          />
          <input
            name="hora_salida"
            type="time"
            className="border rounded p-2"
            value={newDispatch.hora_salida}
            onChange={handleChange}
            required
          />
          <input
            name="tanque"
            type="text"
            placeholder="Tanque"
            className="border rounded p-2"
            value={newDispatch.tanque}
            onChange={handleChange}
            required
          />
          <input
            name="volumen"
            type="number"
            placeholder="Volumen"
            className="border rounded p-2"
            value={newDispatch.volumen}
            onChange={handleChange}
            required
          />
          <input
            name="temperatura_salida"
            type="number"
            placeholder="Temperatura de Salida"
            className="border rounded p-2"
            value={newDispatch.temperatura_salida}
            onChange={handleChange}
            required
          />
          <input
            name="destino"
            type="text"
            placeholder="Destino"
            className="border rounded p-2"
            value={newDispatch.destino}
            onChange={handleChange}
            required
          />
          <input
            name="responsable"
            type="text"
            placeholder="Responsable"
            className="border rounded p-2"
            value={newDispatch.responsable}
            onChange={handleChange}
            required
          />
          <input
            name="firma"
            type="text"
            placeholder="Firma"
            className="border rounded p-2"
            value={newDispatch.firma}
            onChange={handleChange}
            required
          />
          <textarea
            name="observaciones"
            placeholder="Observaciones"
            className="border rounded p-2 col-span-2"
            value={newDispatch.observaciones}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-500 text-white rounded p-2 flex items-center justify-center gap-2 col-span-2"
          >
            <PlusCircle size={20} /> Agregar Despacho
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hora Salida
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volumen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destino
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Responsable
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dispatches.map((dispatch) => (
              <tr key={dispatch.id}>
                <td className="px-6 py-4 whitespace-nowrap">{dispatch.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dispatch.hora_salida}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dispatch.tanque}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dispatch.volumen} L</td>
                <td className="px-6 py-4 whitespace-nowrap">{dispatch.destino}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dispatch.responsable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}