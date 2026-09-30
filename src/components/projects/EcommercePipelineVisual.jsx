import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Lock, Database, ArrowRight, CheckCircle2, Layers, Server } from 'lucide-react';

export default function EcommercePipelineVisual() {
  const [activeStep, setActiveStep] = useState('products');
  const [cartCount, setCartCount] = useState(2);

  const modules = [
    {
      id: 'products',
      name: '1. Product Catalog',
      icon: ShoppingBag,
      tag: 'UI & State',
      desc: 'Dynamic catalog indexing with category filters and real-time stock checks',
      telemetry: 'GET /api/v1/products?limit=12'
    },
    {
      id: 'cart',
      name: '2. Reactive Cart',
      icon: ShoppingCart,
      tag: 'Client State',
      desc: 'Local state synchronization with instant subtotal and tax calculation',
      telemetry: 'POST /api/v1/cart/items (Item IDs: [102, 305])'
    },
    {
      id: 'auth',
      name: '3. Authentication',
      icon: Lock,
      tag: 'Security & JWT',
      desc: 'Stateless JWT session authentication with encrypted passwords and role verification',
      telemetry: 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...'
    },
    {
      id: 'orders',
      name: '4. Order Processing',
      icon: Server,
      tag: 'Transaction',
      desc: 'ACID transactional pipeline ensuring inventory deduction and order receipt generation',
      telemetry: 'POST /api/v1/orders/checkout {status: "CONFIRMED"}'
    },
    {
      id: 'api',
      name: '5. REST API & DB',
      icon: Database,
      tag: 'Backend Core',
      desc: 'Express.js routing communicating with relational MySQL database schemas',
      telemetry: 'INSERT INTO orders (id, user_id, total, status)...'
    }
  ];

  const currentModule = modules.find(m => m.id === activeStep) || modules[0];

  return (
    <div className="w-full rounded-2xl bg-dark-900/90 border border-white/[0.08] p-5 sm:p-6 text-slate-100 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-mono text-xs text-blue-300 font-semibold tracking-wider uppercase">
            Full-Stack E-Commerce System Architecture
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            RESTful Endpoints Active
          </span>
        </div>
      </div>

      {/* Interactive Flow Track */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {modules.map((m) => {
          const isActive = activeStep === m.id;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setActiveStep(m.id)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'border-blue-400/60 bg-blue-500/15 shadow-[0_0_18px_rgba(59,130,246,0.2)]'
                  : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-300' : 'text-slate-400'}`} />
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
                  {m.tag}
                </span>
              </div>
              <div className="font-mono text-xs font-bold text-white">
                {m.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Micro Interface Simulation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-xl bg-dark-950/80 border border-white/[0.06] p-4 font-mono">
        
        {/* Left Interactive Mock Box */}
        <div className="md:col-span-6 p-4 rounded-lg bg-dark-900 border border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 mb-3 border-b border-white/[0.06]">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Layers className="w-3.5 h-3.5" />
                Live Component State
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">● 200 OK</span>
            </div>

            <div className="text-sm font-sans font-medium text-slate-200 mb-1">
              {currentModule.name}
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              {currentModule.desc}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[10px] text-slate-400">Simulate Cart Action:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCartCount(Math.max(1, cartCount - 1))}
                className="w-6 h-6 rounded bg-white/[0.05] hover:bg-white/[0.1] text-xs flex items-center justify-center text-slate-300"
              >
                -
              </button>
              <span className="text-xs font-bold text-blue-400">{cartCount} items</span>
              <button
                onClick={() => setCartCount(cartCount + 1)}
                className="w-6 h-6 rounded bg-white/[0.05] hover:bg-white/[0.1] text-xs flex items-center justify-center text-slate-300"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right API & SQL Response Payload */}
        <div className="md:col-span-6 p-4 rounded-lg bg-dark-900/50 border border-white/[0.04] flex flex-col justify-between">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>REST API Telemetry</span>
            <span className="text-blue-400">Node/Express</span>
          </div>

          <pre className="text-[11px] text-cyan-300 bg-black/40 p-2.5 rounded border border-white/[0.04] overflow-x-auto leading-relaxed">
            <code>{currentModule.telemetry}</code>
          </pre>

          <div className="mt-3 text-[10px] text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Relational Schema Referential Integrity Enforced</span>
          </div>
        </div>

      </div>
    </div>
  );
}
