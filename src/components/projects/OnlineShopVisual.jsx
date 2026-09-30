import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Lock, CheckCircle2, Search, Filter } from 'lucide-react';

export default function OnlineShopVisual() {
  const [cartCount, setCartCount] = useState(2);

  const sampleProducts = [
    { name: "Minimal Canvas Backpack", price: "$64.00", category: "Apparel" },
    { name: "Mechanical Desk Clock", price: "$42.00", category: "Decor" }
  ];

  return (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
      {/* Mock Browser/App Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <span className="text-xs font-semibold text-slate-300">
            Classic Shop Web Interface
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400 font-mono">auth: active</span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 font-medium">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Cart ({cartCount})</span>
          </div>
        </div>
      </div>

      {/* Modern Catalog Cards Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {sampleProducts.map((p, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between"
          >
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400 mb-1">
                {p.category}
              </div>
              <div className="text-sm font-bold text-white mb-2">{p.name}</div>
              <div className="text-sm font-semibold text-blue-400">{p.price}</div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400">In Stock</span>
              <button
                onClick={() => setCartCount(cartCount + 1)}
                className="px-2.5 py-1 rounded bg-slate-700 hover:bg-blue-600 text-xs text-white transition-colors"
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom REST API Banner */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-blue-400">REST API:</span>
          <span>GET /api/v1/products • POST /api/v1/checkout</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Express Backend</span>
        </div>
      </div>
    </div>
  );
}
