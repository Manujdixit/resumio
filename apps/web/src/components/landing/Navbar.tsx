import React from 'react';
import { GitCommitHorizontal } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-background/80 backdrop-blur-md h-14">
      <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-5 h-5 bg-white flex items-center justify-center">
            <div className="w-2 h-2 bg-black" />
          </div>
          <span className="font-mono text-sm font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
            RESUMATES AI
          </span>
          <div className="hidden sm:relative sm:flex items-center px-2 py-0.5 bg-zinc-900/50">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-500" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-zinc-500" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-zinc-500" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-500" />
            <span className="text-[10px] text-zinc-500 font-mono">v2.0</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center h-full">
          {['Features', 'How it Works', 'Pricing'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
              className="h-full flex items-center px-6 text-xs font-mono text-zinc-500 hover:text-white hover:bg-zinc-900 border-l border-zinc-900 first:border-l-0 transition-colors uppercase tracking-wider"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-xs text-zinc-400 hover:text-white font-mono hidden sm:block">Log in</a>
          <Button size="sm" variant="primary" mono icon={<GitCommitHorizontal size={14} />}>
            BUILD RESUME
          </Button>
        </div>
      </div>
    </nav>
  );
};