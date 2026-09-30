import React, { useState } from 'react';
import { Wallet, PieChart, Database, BarChart3, ArrowUpRight, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function ExpenseTrackerVisual() {
  const [selectedCategory, setSelectedCategory] = useState('Development');

  const categories = [
    { name: 'Development', amount: '$420.00', share: '42%', color: 'bg-cyan-400', hex: '#00f2fe' },
    { name: 'Infrastructure', amount: '$240.00', share: '24%', color: 'bg-blue-500', hex: '#3b82f6' },
    { name: 'Databases', amount: '$180.00', share: '18%', color: 'bg-indigo-500', hex: '#6366f1' },
    { name: 'Operations', amount: '$160.00', share: '16%', color: 'bg-purple-500', hex: '#a855f7' },
  ];

  return (
    <div className="w-full rounded-2xl bg-dark-900/90 border border-white/[0.08] p-5 sm:p-6 text-slate-100 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-xs text-amber-300 font-semibold tracking-wider uppercase">
            Financial Analytics & SQLite Ledger
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            ACID Relational Storage
          </span>
        </div>
      </div>

      {/* Analytics Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
        
        {/* Left: Interactive Category Matrix */}
        <div className="md:col-span-6 space-y-2.5">
          <div className="text-xs font-mono text-slate-400 mb-2 uppercase">
            Categorical Expenditure Allocation
          </div>
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedCategory === cat.name
                  ? 'border-amber-400/50 bg-amber-500/10'
                  : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                <span className="text-xs font-medium text-slate-200">{cat.name}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-white font-bold">{cat.amount}</span>
                <span className="text-slate-400 text-[11px] w-8 text-right">{cat.share}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Telemetry & Visual Chart Simulator */}
        <div className="md:col-span-6 p-4 rounded-xl bg-dark-950/80 border border-white/[0.06] flex flex-col justify-between font-mono">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 mb-3 border-b border-white/[0.06]">
              <span className="flex items-center gap-1.5 text-amber-400">
                <BarChart3 className="w-3.5 h-3.5" />
                Matplotlib Visual Telemetry
              </span>
              <span className="text-[10px] text-slate-400">SQLite Backend</span>
            </div>

            {/* Simulated bar distribution chart */}
            <div className="space-y-2 my-3">
              {categories.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{cat.name}</span>
                    <span>{cat.share}</span>
                  </div>
                  <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} transition-all duration-500`}
                      style={{ width: cat.share }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Aggregate Queries Indexed
            </span>
            <span className="text-[10px] text-slate-500">
              Zero Latency Local Storage
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
