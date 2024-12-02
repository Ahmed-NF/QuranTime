import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSuccess?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  label,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  isSuccess = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary/50',
    secondary: 'bg-white text-primary border border-primary hover:bg-primary-light focus:ring-primary/30',
    ghost: 'text-primary hover:bg-primary-light/50 focus:ring-primary/20'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${isLoading ? 'opacity-75 cursor-wait' : ''}
        ${isSuccess ? 'bg-green-500 hover:bg-green-600' : ''}
        ${className}
      `}
      disabled={isLoading}
      {...props}
    >
      {Icon && <Icon size={iconSizes[size]} className={isLoading ? 'animate-spin' : ''} />}
      <span>{label}</span>
    </button>
  );
};