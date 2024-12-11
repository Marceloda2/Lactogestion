import React from 'react';
import { BarChart, Card, Title } from '@tremor/react';
import { LineChart, AreaChart } from '@tremor/react';
import { motion } from 'framer-motion';

const chartdata = [
  { month: 'Ene', Inventario: 2000, Despachos: 1800 },
  { month: 'Feb', Inventario: 2200, Despachos: 2000 },
  { month: 'Mar', Inventario: 2400, Despachos: 2200 },
  { month: 'Abr', Inventario: 2300, Despachos: 2100 },
  { month: 'May', Inventario: 2500, Despachos: 2300 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function Dashboard() {
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
            <Title className="text-primary-navy font-semibold">Tendencia de Inventario</Title>
            <LineChart
              data={chartdata}
              index="month"
              categories={['Inventario']}
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
              categories={['Inventario']}
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