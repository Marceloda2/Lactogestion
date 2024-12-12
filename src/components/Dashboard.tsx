import React, { useEffect, useState } from 'react';
import { BarChart, Card, Title } from '@tremor/react';
import { LineChart, AreaChart } from '@tremor/react';
import { motion } from 'framer-motion';

const defaultChartdata = [
  { month: 'Ene', Recepcion: 2000, Despachos: 1800 },
  { month: 'Feb', Recepcion: 2200, Despachos: 2000 },
  { month: 'Mar', Recepcion: 2400, Despachos: 2200 },
  { month: 'Abr', Recepcion: 2300, Despachos: 2100 },
  { month: 'May', Recepcion: 2500, Despachos: 2300 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Dashboard() {
  const [chartdata, setChartdata] = useState(defaultChartdata);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const response = await fetch('/api/recepcion');
        const data = await response.json();

        // Mapear datos del backend a los meses existentes
        const updatedData = defaultChartdata.map((defaultEntry) => {
          const backendEntry = data.find((item) => item.month === defaultEntry.month);
          return {
            month: defaultEntry.month,
            Recepcion: backendEntry?.recepcion || defaultEntry.rRecepcion,
            Despachos: backendEntry?.Despachos || defaultEntry.Despachos,
          };
        });

        setChartdata(updatedData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    fetchChartData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-primary-white shadow-lg">
            <Title className="text-primary-navy font-semibold">Inventario vs Despachos</Title>
            <BarChart
              data={chartdata}
              index="month"
              categories={['Inventario', 'Despachos']}
              colors={['#A7D8F0', '#BFE6BA']}
              valueFormatter={(number) => `${number} L`}
              className="h-72 mt-4"
            />
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-primary-white shadow-lg">
            <Title className="text-primary-navy font-semibold">Tendencia de Recepcion</Title>
            <LineChart
              data={chartdata}
              index="month"
              categories={['Recepcion']}
              colors={['#003B73']}
              valueFormatter={(number) => `${number} L`}
              className="h-72 mt-4"
            />
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-2"
        >
          <Card className="bg-primary-white shadow-lg">
            <Title className="text-primary-navy font-semibold">Recepción Mensual</Title>
            <AreaChart
              data={chartdata}
              index="month"
              categories={['Recepcion']}
              colors={['#A7D8F0']}
              valueFormatter={(number) => `${number} L`}
              className="h-72 mt-4"
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
