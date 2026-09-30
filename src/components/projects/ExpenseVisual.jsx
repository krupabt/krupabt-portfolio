import React from 'react';
import { Wallet, BarChart3, Database, CheckCircle2 } from 'lucide-react';

export default function ExpenseVisual() {
  const categories = [
    { name: "Development & Tools", amount: "$380.00", share: "45%", color: "bg-amber-400" },
    { name: "Learning Resources", amount: "$220.00", share: "26%", color: "bg-amber-500" },
    { name: "Software Infrastructure", amount: "$150.00", share: "18%", color: "bg-amber-600" },
    { name: "Miscellaneous", amount: "$90.00", share: "11%", color: "bg-amber-700" }
  ];

  return (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
      {/* Desktop App Titlebar Mock */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <span className="text-xs font-semibold text-slate-300">
            Expense Tracker GUI (CustomTkinter)
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <Database className="w-3.5 h-3.5" />
          <span>CSV Storage: Active</span>
        </div>
      </div>

      {/* Visual Expense Chart & Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Monthly Expense Distribution
        </div>

        {/* Stacked Percentage Bar */}
        <div className="w-full h-3 rounded-full bg-slate-800 flex overflow-hidden">
          {categories.map((c, i) => (
            <div
              key={i}
              className={`${c.color}`}
              style={{ width: c.share }}
              title={`${c.name}: ${c.share}`}
            />
          ))}
        </div>

        {/* Categories Breakdown List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {categories.map((c) => (
            <div
              key={c.name}
              className="p-3 rounded-xl bg-slate-800/70 border border-slate-750 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${c.color}`} />
                <span className="text-slate-200">{c.name}</span>
              </div>
              <div className="font-mono text-slate-300 font-medium">
                {c.amount} ({c.share})
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CRUD Persistence Footer */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="font-mono text-slate-400">
          <span>CRUD Pipeline:</span> Add, Edit, Delete & Categorize Records
        </div>
        <div className="flex items-center gap-1.5 text-amber-400 text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Built with Python & CustomTkinter</span>
        </div>
      </div>
    </div>
  );
}
