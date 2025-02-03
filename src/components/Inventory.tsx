import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { ReceptionForm } from './forms/ReceptionForm';
import { DispatchForm } from './forms/DispatchForm';
import { PlusCircle, TruckIcon, PackageCheck, Calculator } from 'lucide-react';

interface InventoryItem {
  id: number;
  fecha: string;
  litros: number;
  origen: 'recepcion' | 'despacho';
}

export function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showReceptionForm, setShowReceptionForm] = useState(false);
  const [showDispatchForm, setShowDispatchForm] = useState(false);
  const [totalLiters, setTotalLiters] = useState(0);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const [receptions, dispatches] = await Promise.all([
        api.getReceptions(),
        api.getDispatches()
      ]);

      const formattedInventory: InventoryItem[] = [
        ...receptions.data.map((r: any) => ({
          id: r[0],
          fecha: r[1],
          litros: Number(r[4]),
          origen: 'recepcion' as const
        })),
        ...dispatches.data.map((d: any) => ({
          id: d[0],
          fecha: d[1],
          litros: -Number(d[4]), // Negative for dispatches
          origen: 'despacho' as const
        }))
      ].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

      setInventory(formattedInventory);
      calculateTotal(formattedInventory);
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  };

  const calculateTotal = (items: InventoryItem[]) => {
    const total = items.reduce((acc, item) => acc + item.litros, 0);
    setTotalLiters(total);
  };

  const handleSuccess = () => {
    loadInventory();
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-white rounded-lg shadow-lg overflow-hidden mb-6"
      >
        <table className="min-w-full">
          <thead>
            <tr className="bg-primary-blue/20">
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Litros
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-white divide-y divide-accent-gray">
            {inventory.map((item) => (
              <motion.tr
                key={`${item.origen}-${item.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-secondary-yellow/5"
              >
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {new Date(item.fecha).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {Math.abs(item.litros)} L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">
                  {item.origen === 'recepcion' ? 'Recepción' : 'Despacho'}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReceptionForm(true)}
            className="bg-primary-navy text-primary-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-primary-navy/90 transition-colors"
          >
            <PackageCheck size={20} />
            Nueva Recepción
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDispatchForm(true)}
            className="bg-primary-navy text-primary-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-primary-navy/90 transition-colors"
          >
            <TruckIcon size={20} />
            Nuevo Despacho
          </motion.button>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-secondary-yellow/20 rounded-lg px-6 py-3 flex items-center gap-3"
        >
          <Calculator size={24} className="text-primary-navy" />
          <span className="text-lg font-semibold text-primary-navy">
            Total: {totalLiters} L
          </span>
        </motion.div>
      </div>

      <AnimatePresence>
        {showReceptionForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowReceptionForm(false)}
          >
            <div onClick={e => e.stopPropagation()}>
              <ReceptionForm
                onSuccess={handleSuccess}
                onClose={() => setShowReceptionForm(false)}
              />
            </div>
          </motion.div>
        )}

        {showDispatchForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowDispatchForm(false)}
          >
            <div onClick={e => e.stopPropagation()}>
              <DispatchForm
                onSuccess={handleSuccess}
                onClose={() => setShowDispatchForm(false)}
                availableVolume={totalLiters}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}