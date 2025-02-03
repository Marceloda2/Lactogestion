import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface MilkReception {
  id: number;
  fecha: string;
  hora: string;
  nombre: string;
  volumen: number;
  tanque: string;
  parametros: {
    temperatura: number;
    densidad: number;
    alcohol: boolean;
    antibiotico: boolean;
    observaciones: string;
  };
}
import { RejectMilkForm } from './forms/RejectMilkForm';

export function Reception() {
  const [receptions, setReceptions] = useState<MilkReception[]>([]);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [selectedReception, setSelectedReception] = useState<MilkReception | null>(null);

  useEffect(() => {
    loadReceptions();
  }, []);

  const loadReceptions = async () => {
    try {
      const response = await api.getReceptions();
      const formattedReceptions = response.data
        .filter((r: any) => !r[11]) // Filter out rejected receptions
        .map((reception: any[]) => ({
          id: reception[0],
          fecha: reception[1],
          hora: reception[2],
          nombre: reception[3],
          volumen: reception[4],
          tanque: reception[5],
          parametros: {
            temperatura: reception[9],
            densidad: reception[6],
            alcohol: reception[7] === 85,
            antibiotico: reception[8] === 'si',
            observaciones: reception[10] || ''
          }
        }));
      setReceptions(formattedReceptions);
    } catch (error) {
      console.error('Error loading receptions:', error);
    }
  };

  const handleReject = (reception: MilkReception) => {
    setSelectedReception(reception);
    setShowRejectForm(true);
  };

  const handleRejectSubmit = async (rejectData: any) => {
    try {
      await api.addRejection(rejectData);
      await loadReceptions();
      setShowRejectForm(false);
      setSelectedReception(null);
    } catch (error) {
      console.error('Error rejecting milk:', error);
    }
  };

  const hasQualityIssues = (reception: MilkReception) => {
    return (
      reception.parametros.temperatura > 30 ||
      reception.parametros.densidad !== 100 ||
      !reception.parametros.alcohol ||
      !reception.parametros.antibiotico
    );
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-white rounded-lg shadow-lg overflow-hidden"
      >
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
                Productor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Volumen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Tanque
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-primary-navy uppercase tracking-wider">
                Densidad
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-primary-navy uppercase tracking-wider">
                Alcohol
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-primary-navy uppercase tracking-wider">
                Antibiótico
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Temperatura
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
                  {reception.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {reception.volumen} L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {reception.tanque}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {reception.parametros.densidad === 100 ? (
                    <CheckCircle className="text-secondary-green inline" size={20} />
                  ) : (
                    <AlertTriangle className="text-accent-red inline" size={20} />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {reception.parametros.alcohol ? (
                    <CheckCircle className="text-secondary-green inline" size={20} />
                  ) : (
                    <AlertTriangle className="text-accent-red inline" size={20} />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {reception.parametros.antibiotico ? (
                    <CheckCircle className="text-secondary-green inline" size={20} />
                  ) : (
                    <AlertTriangle className="text-accent-red inline" size={20} />
                  )}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  reception.parametros.temperatura > 30 ? 'text-accent-red' : 'text-primary-navy'
                }`}>
                  {reception.parametros.temperatura}°C
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {hasQualityIssues(reception) ? (
                    <span className="inline-flex items-center gap-1 text-accent-red">
                      <button
                      onClick={() => handleReject(reception)}
                      className="inline-flex items-center gap-1 text-accent-red"
                    >
                      <AlertTriangle size={16} />
                      Revisar
                    </button>
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
      </motion.div>

      <AnimatePresence>
        {showRejectForm && selectedReception && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowRejectForm(false)}
          >
            <div onClick={e => e.stopPropagation()}>
              <RejectMilkForm
                reception={selectedReception}
                onSubmit={handleRejectSubmit}
                onClose={() => setShowRejectForm(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}