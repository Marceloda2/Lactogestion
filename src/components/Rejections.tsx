import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Rejections = () => {
  const [rejections, setRejections] = useState([]);

  useEffect(() => {
    loadRejections();
  }, []);

  const loadRejections = async () => {
    try {
      const response = await api.getRejections();
      const formattedRejections = response.data.map((rejection: any[]) => ({
        id: rejection[0],
        fecha: rejection[1],
        hora: rejection[2],
        motivo: rejection[3],
        observaciones: rejection[4]
      }));
      setRejections(formattedRejections);
    } catch (error) {
      console.error('Error loading rejections:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString: string) => {
    if (!timeString) {
      return 'Invalid Time';
    }
    const date = new Date(`1970-01-01T${timeString}`);
    if (isNaN(date.getTime())) {
      // Try parsing the time string manually
      const [time, modifier] = timeString.split(' ');
      let [hours, minutes, seconds] = time.split(':');
      if (modifier === 'PM' && hours !== '12') {
        hours = (parseInt(hours, 10) + 12).toString();
      }
      if (modifier === 'AM' && hours === '12') {
        hours = '00';
      }
      const formattedTimeString = `${hours}:${minutes}:${seconds}`;
      const formattedDate = new Date(`1970-01-01T${formattedTimeString}`);
      if (isNaN(formattedDate.getTime())) {
        return 'Invalid Time';
      }
      const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return formattedDate.toLocaleTimeString(undefined, options);
    }
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="p-6">
      <div className="bg-primary-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-primary-blue/20">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">Motivo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-navy uppercase tracking-wider">Observaciones</th>
            </tr>
          </thead>
          <tbody className="bg-primary-white divide-y divide-accent-gray">
            {rejections.map((rejection) => (
              <tr key={rejection.id}>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{formatDate(rejection.fecha)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{formatTime(rejection.hora)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{rejection.motivo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-primary-navy">{rejection.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rejections;