import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  mono?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  icon,
  mono = false,
  className = '',
  ...props 
}) => {
  const baseStyles = `inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none border disabled:opacity-50 disabled:cursor-not-allowed ${mono ? 'font-mono tracking-tight' : ''}`;
  
  const variants = {
    primary: "bg-white text-black border-white hover:bg-zinc-200 hover:border-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    secondary: "bg-zinc-900 text-zinc-100 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800",
    outline: "bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-white/40",
    ghost: "bg-transparent text-zinc-400 border-transparent hover:text-white hover:bg-zinc-900",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-2",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-8 py-3 gap-3",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <div className="animate-spin w-3 h-3 border-2 border-current border-t-transparent rounded-full mr-2" />
      )}
      {!isLoading && icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};