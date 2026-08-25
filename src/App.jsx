import React from 'react';
import { ServiceCard } from './components/ServiceCard';
import { useServices } from './hooks/useServices';
import { Search, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function App() {
  const {
    services,
    search,
    setSearch,
    selectedService,
    setSelectedService,
    simulateIncident,
    recoverAll,
  } = useServices();

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      {/* Header com os botões de controle de incidentes */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">KubeStatus Lite</h1>
            <p className="text-xs text-slate-400">Painel de Integridade de Serviços</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar pod ou namespace..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-xs rounded-lg pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <button
            onClick={simulateIncident}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Simular Erro
          </button>

          <button
            onClick={recoverAll}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Restaurar
          </button>
        </div>
      </header>

      {/* Grid de Serviços */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} onSelect={setSelectedService} />
        ))}
      </main>

      {/* Terminal de Logs (Modal) */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
              <span className="text-xs font-mono text-cyan-400">logs --pod={selectedService.name}</span>
              <button 
                onClick={() => setSelectedService(null)} 
                className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 bg-slate-700/50 rounded cursor-pointer"
              >
                Fechar [ESC]
              </button>
            </div>
            <div className="p-4 bg-slate-950 font-mono text-xs space-y-2 h-64 overflow-y-auto text-slate-300">
              {services
                .find(s => s.id === selectedService.id)
                ?.logs.map((log, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="text-slate-600">{index + 1}</span>
                    <span className={log.includes('ERROR') || log.includes('FATAL') ? 'text-rose-400 font-semibold' : 'text-slate-300'}>
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