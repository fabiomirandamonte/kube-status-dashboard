import React, { useState, useEffect } from 'react';
import { ServiceCard } from './components/ServiceCard';
import { Search, Activity, RefreshCw } from 'lucide-react';

const INITIAL_SERVICES = [
  { id: 1, name: 'auth-service', namespace: 'prod-core', status: 'Healthy', cpu: 12, memory: 256, logs: ['[INFO] Auth token issued', '[INFO] Session validated'] },
  { id: 2, name: 'payment-gateway', namespace: 'prod-finance', status: 'Warning', cpu: 88, memory: 1024, logs: ['[WARN] High latency detected', '[WARN] Retry attempt 2/3'] },
  { id: 3, name: 'user-db-replica', namespace: 'prod-db', status: 'Healthy', cpu: 45, memory: 2048, logs: ['[INFO] Replication synced', '[INFO] Healthcheck OK'] },
  { id: 4, name: 'notification-worker', namespace: 'prod-tools', status: 'Failing', cpu: 0, memory: 64, logs: ['[ERROR] OOMKilled - Out of memory', '[FATAL] Container exited with code 137'] },
];

export default function App() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  // Simula atualização de métricas em tempo real a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setServices(prev =>
        prev.map(item => ({
          ...item,
          cpu: Math.min(100, Math.max(5, item.cpu + Math.floor(Math.random() * 11) - 5)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.namespace.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">KubeStatus Lite</h1>
            <p className="text-xs text-slate-400">Painel de Integridade de Serviços</p>
          </div>
        </div>

        {/* Input de Busca */}
        <div className="relative w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar pod ou namespace..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-xs rounded-lg pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </header>

      {/* Grid de Serviços */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map(service => (
          <ServiceCard key={service.id} service={service} onSelect={setSelectedService} />
        ))}
      </main>

      {/* Terminal de Logs (Modal do serviço selecionado) */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
              <span className="text-xs font-mono text-cyan-400">logs --pod={selectedService.name}</span>
              <button 
                onClick={() => setSelectedService(null)} 
                className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 bg-slate-700/50 rounded"
              >
                Fechar [ESC]
              </button>
            </div>
            <div className="p-4 bg-slate-950 font-mono text-xs space-y-2 h-64 overflow-y-auto text-slate-300">
              {selectedService.logs.map((log, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-slate-600">{new Date().toLocaleTimeString()}</span>
                  <span className={log.includes('ERROR') || log.includes('FATAL') ? 'text-rose-400' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}