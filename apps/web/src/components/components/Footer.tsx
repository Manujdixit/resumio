import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] py-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-zinc-800"></div>
            <span className="font-mono text-xs text-zinc-500">RESUMATES AI © 2025</span>
          </div>
          
          <div className="flex gap-8 font-mono text-xs text-zinc-600">
            <a href="#" className="hover:text-zinc-300 transition-colors">About</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Features</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};