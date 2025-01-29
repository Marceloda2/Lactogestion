import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Provider } from '../../types/milk';
import { LineChart, Card, Title } from '@tremor/react';
import { AlertTriangle, CheckCircle, History, Droplet, ArrowLeft } from 'lucide-react';
import { api } from '../../utils/api';

interface ProviderProfileProps {
  producerId: number;
  onBack?: () => void;
}

export function ProviderProfile({ producerId, onBack }: ProviderProfileProps) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProviderData();
  }, [producerId]);

  const loadProviderData = async () => {
    try {
      const response = await api.getProducers(producerId);
      setProvider(response.data);
    } catch (error) {
      console.error('Error loading provider profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-navy"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="p-6 text-center text-accent-red">
        No se pudo cargar la información del productor
      </div>
    );
  }

  const hasQualityIssues = provider.historial_calidad.length > 0;
  
  // Preparar datos para el gráfico
  const deliveryData = provider.entregas.map(entrega => ({
    fecha: entrega.fecha,
    volumen: entrega.volumen,
    densidad: entrega.parametros.densidad,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      {/* Botón de regreso para admin */}
      {onBack && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 text-primary-navy hover:text-primary-blue transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a la lista
        </motion.button>
      )}

      {/* Información básica */}
      <div className="bg-primary-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-primary-navy mb-4">{provider.nombre}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-accent-gray">Código</p>
            <p className="text-primary-navy font-semibold">{provider.codigo}</p>
          </div>
          {provider.telefono && (
            <div>
              <p className="text-accent-gray">Teléfono</p>
              <p className="text-primary-navy font-semibold">{provider.telefono}</p>
            </div>
          )}
          {provider.direccion && (
            <div className="col-span-2">
              <p className="text-accent-gray">Dirección</p>
              <p className="text-primary-navy font-semibold">{provider.direccion}</p>
            </div>
          )}
        </div>
      </div>

      {/* Historial de calidad */}
      <Card className="bg-primary-white">
        <div className="flex items-center gap-2 mb-4">
          <History className="text-primary-navy" size={24} />
          <Title>Historial de Calidad</Title>
        </div>
        {hasQualityIssues ? (
          <div className="space-y-4">
            {provider.historial_calidad.map((incidencia, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-accent-red p-4 bg-accent-red/10 rounded"
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-accent-red shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-primary-navy">
                      {new Date(incidencia.fecha).toLocaleDateString()}
                    </p>
                    <p className="text-accent-gray">{incidencia.incidencia}</p>
                    <p className="text-primary-navy mt-2">
                      <span className="font-semibold">Acción tomada: </span>
                      {incidencia.accion_tomada}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-secondary-green">
            <CheckCircle size={20} />
            <p>Sin incidencias de calidad registradas</p>
          </div>
        )}
      </Card>

      {/* Gráficos de entregas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary-white">
          <div className="flex items-center gap-2 mb-4">
            <Droplet className="text-primary-navy" size={24} />
            <Title>Volumen de Entregas</Title>
          </div>
          <LineChart
            data={deliveryData}
            index="fecha"
            categories={["volumen"]}
            colors={["blue"]}
            valueFormatter={(number) => `${number} L`}
            className="h-72 mt-4"
          />
        </Card>

        <Card className="bg-primary-white">
          <div className="flex items-center gap-2 mb-4">
            <Droplet className="text-primary-navy" size={24} />
            <Title>Densidad de la Leche</Title>
          </div>
          <LineChart
            data={deliveryData}
            index="fecha"
            categories={["densidad"]}
            colors={["green"]}
            valueFormatter={(number) => `${number}`}
            className="h-72 mt-4"
          />
        </Card>
      </div>

      {/* Tabla de entregas recientes */}
      <Card className="bg-primary-white">
        <Title>Entregas Recientes</Title>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full">
            <thead>
              <tr className="bg-primary-blue/20">
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Volumen</th>
                <th className="px-4 py-2 text-left">Temperatura</th>
                <th className="px-4 py-2 text-left">Densidad</th>
                <th className="px-4 py-2 text-left">Alcohol</th>
                <th className="px-4 py-2 text-left">Antibiótico</th>
              </tr>
            </thead>
            <tbody>
              {provider.entregas.slice(0, 10).map((entrega, index) => (
                <tr key={index} className="border-b border-accent-gray">
                  <td className="px-4 py-2">{entrega.fecha}</td>
                  <td className="px-4 py-2">{entrega.volumen} L</td>
                  <td className="px-4 py-2">{entrega.parametros.temperatura}°C</td>
                  <td className="px-4 py-2">{entrega.parametros.densidad}</td>
                  <td className="px-4 py-2">
                    {entrega.parametros.alcohol ? (
                      <AlertTriangle className="text-accent-red" size={20} />
                    ) : (
                      <CheckCircle className="text-secondary-green" size={20} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {entrega.parametros.antibiotico ? (
                      <AlertTriangle className="text-accent-red" size={20} />
                    ) : (
                      <CheckCircle className="text-secondary-green" size={20} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}