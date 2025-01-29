import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../utils/api';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import type { MilkReception } from '../types/milk';

export function Reception() {
  const [receptions, setReceptions] = useState<MilkReception[]>([]);

  useEffect(() => {
    loadReceptions();
  }, []);

  const loadReceptions = async () => {
    try {
      const response = await api.getReceptions();
      const formattedReceptions = response.data.map((reception: any[]) => ({
        id: reception[0],
        fecha: reception[1],
        hora: reception[2],
        proveedor_id: reception[3],
        volumen: reception[4],
        tanque: reception[5],
        parametros: {
          temperatura: reception[5],
          densidad: reception[6],
          alcohol: reception[8] === '1',
          antibiotico: reception[9] === '1',
          observaciones: reception[10] || ''
        }
      }));
      setReceptions(formattedReceptions);
    } catch (error) {
      console.error('Error loading receptions:', error);
    }
  };

  const hasQualityIssues = (reception: MilkReception) => {
    return (
      reception.parametros.temperatura > 30 ||
      reception.parametros.densidad < 28 ||
      reception.parametros.alcohol ||
      reception.parametros.antibiotico
    );
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
                Hora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Volumen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Tanque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Temperatura
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Densidad
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-primary-navy uppercase tracking-wider">
                Alcohol
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-primary-navy uppercase tracking-wider">
                Antibiótico
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-white divide-y divide-accent-gray">
            {receptions.map((reception) => (
              <motion.tr
                key={reception.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`hover:bg-secondary-yellow/5 ${
                  hasQualityIssues(reception) ? 'bg-accent-red/5' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {new Date(reception.fecha).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {reception.hora}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {reception.volumen} L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {reception.tanque}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  reception.parametros.temperatura > 30 ? 'text-accent-red' : 'text-primary-navy'
                }`}>
                  {reception.parametros.temperatura}°C
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  reception.parametros.densidad < 28 ? 'text-accent-red' : 'text-primary-navy'
                }`}>
                  {reception.parametros.densidad}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {reception.parametros.alcohol ? (
                    <AlertTriangle className="text-accent-red inline" size={20} />
                  ) : (
                    <CheckCircle className="text-secondary-green inline" size={20} />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {reception.parametros.antibiotico ? (
                    <AlertTriangle className="text-accent-red inline" size={20} />
                  ) : (
                    <CheckCircle className="text-secondary-green inline" size={20} />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {hasQualityIssues(reception) ? (
                    <span className="inline-flex items-center gap-1 text-accent-red">
                      <AlertTriangle size={16} />
                      Revisar
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-secondary-green">
                      <CheckCircle size={16} />
                      OK
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}