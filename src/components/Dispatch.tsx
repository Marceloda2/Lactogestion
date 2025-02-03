import React, { useState, useEffect } from 'react';
import api from '../utils/api';

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

  return (
    <div className="p-6">
      <div className="bg-primary-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-primary-blue/20">
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Hora Salida
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Tanque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Volumen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Destino
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Responsable
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-white divide-y divide-accent-gray">
            {dispatches.map((dispatch) => (
              <tr key={dispatch.id} className="hover:bg-secondary-yellow/5">
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{dispatch.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{dispatch.hora_salida}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{dispatch.tanque}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{dispatch.volumen} L</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{dispatch.destino}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{dispatch.responsable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}