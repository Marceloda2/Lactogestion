import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    loadReceptions();
  }, []);

  const loadReceptions = async () => {
    try {
      const response = await api.getReceptions();
      const formattedReceptions = response.data.map((reception: any[]) => ({
        id: reception[0],
        fecha: reception[1],
        hora_entrada: reception[2],
        nombre: reception[3],
        volumen: reception[4],
        tanque: reception[5],
        densidad: reception[6],
        alcohol_85: reception[7],
        antibiotico: reception[8],
        observaciones: reception[9],
      }));
      setReceptions(formattedReceptions);
    } catch (error) {
      console.error('Error loading receptions:', error);
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
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Volumen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Tanque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Densidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Alcohol 85%
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-white divide-y divide-accent-gray">
            {receptions.map((reception) => (
              <tr key={reception.id} className="hover:bg-secondary-yellow/5">
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{reception.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{reception.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{reception.volumen} L</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{reception.tanque}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{reception.densidad}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{reception.alcohol_85}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
