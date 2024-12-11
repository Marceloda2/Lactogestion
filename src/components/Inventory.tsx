import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { api } from '../utils/api';
import { formatApiError } from '../utils/errorHandling';

interface InventoryItem {
  id: number;
  productor_id: string;
  fecha: string;
  litros: number;
  cliente: string;
}

export function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    productor_id: '',
    fecha: '',
    litros: 0,
    cliente: '',
  });

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const response = await api.getInventory();
      if (response.error) {
        setError(response.error);
        return;
      }
      
      const formattedItems = response.data.map((item: any[]) => ({
        id: item[0],
        productor_id: item[1],
        litros: item[2],
        fecha: item[3],
        cliente: item[4],
      }));
      setItems(formattedItems);
      setError(null);
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  const addItem = async () => {
    if (newItem.productor_id && newItem.fecha && newItem.litros && newItem.cliente) {
      try {
        const response = await api.addInventory(newItem);
        if (response.error) {
          setError(response.error);
          return;
        }
        await loadInventory();
        setNewItem({ productor_id: '', fecha: '', litros: 0, cliente: '' });
        setError(null);
      } catch (error) {
        setError(formatApiError(error));
      }
    }
  };

  return (
    <div className="p-6">
      {error && (
        <div className="mb-4 bg-accent-red/10 border border-accent-red text-accent-red px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-6 bg-primary-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold mb-4 text-primary-navy">Agregar al Inventario</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="ID Productor"
            className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
            value={newItem.productor_id}
            onChange={(e) => setNewItem({ ...newItem, productor_id: e.target.value })}
          />
          <input
            type="date"
            className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
            value={newItem.fecha}
            onChange={(e) => setNewItem({ ...newItem, fecha: e.target.value })}
          />
          <input
            type="number"
            placeholder="Litros"
            className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
            value={newItem.litros || ''}
            onChange={(e) => setNewItem({ ...newItem, litros: Number(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Cliente"
            className="border border-accent-gray rounded p-2 focus:border-primary-blue focus:ring focus:ring-primary-blue/30 outline-none"
            value={newItem.cliente}
            onChange={(e) => setNewItem({ ...newItem, cliente: e.target.value })}
          />
          <button
            onClick={addItem}
            className="bg-primary-navy text-primary-white rounded p-2 flex items-center justify-center gap-2 col-span-full hover:bg-primary-navy/90 transition-colors"
          >
            <PlusCircle size={20} /> Agregar al Inventario
          </button>
        </div>
      </div>

      <div className="bg-primary-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-primary-blue/20">
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                ID Productor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Litros
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">
                Cliente
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-white divide-y divide-accent-gray">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-secondary-yellow/5">
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{item.productor_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{item.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{item.litros} L</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{item.cliente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}