import { useState, useEffect } from 'react';
import { INITIAL_SERVICES } from '../types/initialServices';

export function useServices() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setServices(prev =>
        prev.map(service => {
          if (service.status === 'Failing') return service;

          // Aumentamos o delta aleatório para variar entre -15% e +15%
          const randomDelta = Math.floor(Math.random() * 31) - 15;
          const newCpu = Math.min(95, Math.max(10, service.cpu + randomDelta));

          const updatedHistory = [...(service.history || []), { time: now, cpu: newCpu }].slice(-10);

          return {
            ...service,
            cpu: newCpu,
            history: updatedHistory,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const simulateIncident = () => {
    const healthy = services.filter(s => s.status !== 'Failing');
    if (healthy.length === 0) return;

    const target = healthy[Math.floor(Math.random() * healthy.length)];
    setServices(prev =>
      prev.map(s =>
        s.id === target.id
          ? {
              ...s,
              status: 'Failing',
              cpu: 0,
              history: [...s.history, { time: new Date().toLocaleTimeString(), cpu: 0 }].slice(-10),
              logs: [...s.logs, `[FATAL] Unexpected crash at ${new Date().toLocaleTimeString()}`],
            }
          : s
      )
    );
  };

  const recoverAll = () => {
    setServices(prev =>
      prev.map(s => ({
        ...s,
        status: 'Healthy',
        cpu: 25,
        logs: [...s.logs, `[INFO] Service recovered at ${new Date().toLocaleTimeString()}`],
      }))
    );
  };

  const filteredServices = services.filter(
    s => s.name.toLowerCase().includes(search.toLowerCase()) || s.namespace.toLowerCase().includes(search.toLowerCase())
  );

  return {
    services: filteredServices,
    search,
    setSearch,
    selectedService,
    setSelectedService,
    simulateIncident,
    recoverAll,
  };
}