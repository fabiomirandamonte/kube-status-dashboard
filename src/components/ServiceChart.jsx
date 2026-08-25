import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export function ServiceChart({ data }) {
  return (
    <div className="h-28 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
          <XAxis 
            dataKey="time" 
            stroke="#475569" 
            fontSize={9} 
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis 
            stroke="#475569" 
            fontSize={9} 
            domain={[0, 100]} 
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              borderColor: '#334155', 
              borderRadius: '6px', 
              fontSize: '11px',
              color: '#f8fafc'
            }} 
            itemStyle={{ color: '#38bdf8' }}
            formatter={(value) => [`${value}%`, 'CPU']}
          />
          <Line 
            type="monotone" 
            dataKey="cpu" 
            stroke="#38bdf8" 
            strokeWidth={2} 
            dot={{ r: 2, fill: '#38bdf8' }}
            activeDot={{ r: 4, fill: '#38bdf8' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}