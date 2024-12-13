import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign } from 'lucide-react';
import { api } from '../../utils/api';

interface ProducerTotal {
  nombre: string;
  litros: number;
  valorPorLitro: number;
  total: number;
}

export function ProducerMilkTotals() {
  const [totals, setTotals] = useState<ProducerTotal[]>([]);
  const [valorPorLitro, setValorPorLitro] = useState(1000); // Valor por defecto en pesos

  useEffect(() => {
    loadTotals();
    
  }, []);

  const loadTotals = async () => {
    try {
      const [receptions, producers] = await Promise.all([
        api.getReceptions(),
        api.getProducers(),
      ]);
  
      // Map producer IDs to names
      const producerMap = new Map(
        producers.data.map((p) => [p[0], p[1]]) // Assuming p[0] is ID, p[1] is name
      );
  
      // Aggregate liters per producer
      const totalesPorProductor = receptions.data.reduce((acc, r) => {
        const producerName = r[3]; // Use producerName directly from the data
        const litros = Number(r[4]); // Amount of liters is at index 4
        acc.set(producerName, (acc.get(producerName) || 0) + litros);
        return acc;
      }, new Map());
  
      // Convert aggregated totals to an array
      const totalsArray: ProducerTotal[] = Array.from(totalesPorProductor).map(
        ([nombre, litros]) => ({
          nombre,
          litros,
          valorPorLitro,
          total: litros * valorPorLitro,
        })
      );
  
      setTotals(totalsArray);
    } catch (error) {
      console.error('Error loading totals:', error);
    }
  };

  const totalGeneral = totals.reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-white rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-primary-navy">Total de Leche por Productor</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="text-primary-navy" size={20} />
              <input
                type="number"
                value={valorPorLitro}
                onChange={(e) => {
                  setValorPorLitro(Number(e.target.value));
                  loadTotals();
                }}
                className="border border-accent-gray rounded p-2 w-32"
                placeholder="Valor por litro"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-primary-blue/20">
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                  Productor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                  Litros
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                  Valor por Litro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-white divide-y divide-accent-gray">
              {totals.map((total, index) => (
                <motion.tr
                  key={total.nombre}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-secondary-yellow/5"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                    {total.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                    {total.litros.toLocaleString()} L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                    ${total.valorPorLitro.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                    ${total.total.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-secondary-yellow/20 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Calculator size={24} className="text-primary-navy" />
            <span className="text-lg font-semibold text-primary-navy">
              Total General:
            </span>
          </div>
          <span className="text-xl font-bold text-primary-navy">
            ${totalGeneral.toLocaleString()}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}