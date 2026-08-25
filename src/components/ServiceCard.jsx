import React from 'react';
import { StatusBadge } from './StatusBadge';
import { ServiceChart } from './ServiceChart';
import { Cpu, HardDrive, Terminal } from 'lucide-react';

export function ServiceCard({ service, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(service)}
      className="bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 rounded-xl p-5 transition-all cursor-pointer hover:shadow-lg hover:shadow-cyan-500/5 group"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
            {service.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{service.namespace}</p>
        </div>
        <StatusBadge status={service.status} />
      </div>

      {/* Gráfico Dinâmico do Recharts */}
      <ServiceChart data={service.history || []} />

      {/* Métricas e Rodapé */}
      <div className="grid grid-cols-2 gap-3 pt-3 mt-2 border-t border-slate-700/40 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-slate-400" />
          <span>CPU: <strong className="text-slate-100">{service.cpu}%</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-slate-400" />
          <span>RAM: <strong className="text-slate-100">{service.memory}MB</strong></span>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <span className="text-xs text-cyan-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
          <Terminal className="w-3.5 h-3.5" /> Ver Logs
        </span>
      </div>
    </div>
  );
}