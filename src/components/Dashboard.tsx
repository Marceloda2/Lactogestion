import React from 'react';
import { BarChart, Card, Title } from '@tremor/react';
import { LineChart, AreaChart } from '@tremor/react';

const chartdata = [
  { month: 'Ene', Inventario: 2000, Despachos: 1800 },
  { month: 'Feb', Inventario: 2200, Despachos: 2000 },
  { month: 'Mar', Inventario: 2400, Despachos: 2200 },
  { month: 'Abr', Inventario: 2300, Despachos: 2100 },
  { month: 'May', Inventario: 2500, Despachos: 2300 },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Title>Inventario vs Despachos</Title>
          <BarChart
            data={chartdata}
            index="month"
            categories={['Inventario', 'Despachos']}
            colors={['blue', 'green']}
            className="h-72"
          />
        </Card>
        
        <Card>
          <Title>Tendencia de Inventario</Title>
          <LineChart
            data={chartdata}
            index="month"
            categories={['Inventario']}
            colors={['blue']}
            className="h-72"
          />
        </Card>

        <Card>
          <Title>Recepción Mensual</Title>
          <AreaChart
            data={chartdata}
            index="month"
            categories={['Inventario']}
            colors={['purple']}
            className="h-72"
          />
        </Card>
      </div>
    </div>
  );
}