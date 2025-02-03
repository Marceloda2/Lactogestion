import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Printer } from 'lucide-react';
import api from '../../utils/api';

interface ProducerTotal {
  nombre: string;
  litros: number;
  valorPorLitro: number;
  total: number;
  entregas?: {
    fecha: string;
    litros: number;
    valor: number;
  }[];
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

      // Group receptions by producer
      const entregasPorProductor = receptions.data.reduce((acc, r) => {
        const producerName = r[3]; // Use producerName directly from the data
        if (!acc[producerName]) {
          acc[producerName] = [];
        }
        acc[producerName].push({
          fecha: r[1], // fecha at index 1
          litros: Number(r[4]), // Amount of liters at index 4
          valor: Number(r[4]) * valorPorLitro
        });
        return acc;
      }, {} as Record<string, any[]>);

      // Calculate totals and format data
      const totalsArray: ProducerTotal[] = Object.entries(entregasPorProductor).map(
        ([nombre, entregas]) => {
          const totalLitros = entregas.reduce((sum, e) => sum + e.litros, 0);
          return {
            nombre,
            litros: totalLitros,
            valorPorLitro,
            total: totalLitros * valorPorLitro,
            entregas
          };
        }
      );

      setTotals(totalsArray);
    } catch (error) {
      console.error('Error loading totals:', error);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const currentDate = new Date().toLocaleDateString();
    const producer = totals[0]; // For user view, there should only be one producer

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reporte de Entregas de Leche</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #003B73;
              padding-bottom: 20px;
            }
            .info {
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f8f9fa;
            }
            .total {
              text-align: right;
              font-weight: bold;
              font-size: 1.2em;
              margin-top: 20px;
              border-top: 2px solid #003B73;
              padding-top: 20px;
            }
            @media print {
              body { print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Reporte de Entregas de Leche</h1>
            <p>Fecha de emisión: ${currentDate}</p>
          </div>
          
          <div class="info">
            <h2>Información del Productor</h2>
            <p><strong>Nombre:</strong> ${producer.nombre}</p>
            <p><strong>Valor por Litro:</strong> $${producer.valorPorLitro.toLocaleString()}</p>
          </div>

          <h2>Detalle de Entregas</h2>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Litros</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              ${producer.entregas?.map(entrega => `
                <tr>
                  <td>${new Date(entrega.fecha).toLocaleDateString()}</td>
                  <td>${entrega.litros.toLocaleString()} L</td>
                  <td>$${entrega.valor.toLocaleString()}</td>
                </tr>
              `).join('') || ''}
            </tbody>
          </table>

          <div class="total">
            <p>Total Litros: ${producer.litros.toLocaleString()} L</p>
            <p>Total a Pagar: $${producer.total.toLocaleString()}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="bg-primary-navy text-primary-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-primary-navy/90 transition-colors"
            >
              <Printer size={20} />
              Imprimir Reporte
            </motion.button>
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