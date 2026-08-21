import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'dark' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, iconOnly, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm';
    
    const variants = {
      primary: 'bg-[#111111] hover:bg-black text-white focus:ring-[#111111] dark:bg-white dark:text-[#111111] dark:hover:bg-gray-100',
      secondary: 'bg-[#E7B65A] hover:bg-[#B88632] text-[#111111] focus:ring-[#E7B65A] font-semibold',
      outline: 'border border-gray-300 hover:bg-gray-100 text-[#111111] focus:ring-gray-400 bg-white',
      ghost: 'hover:bg-gray-200/60 text-[#111111] focus:ring-gray-300',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      dark: 'bg-[#050505] hover:bg-[#111111] text-white border border-gray-800 focus:ring-gray-700',
      whatsapp: 'bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium focus:ring-[#25D366]',
    };

    const sizes = {
      sm: iconOnly ? 'p-1.5 text-xs rounded-md' : 'px-3 py-1.5 text-xs rounded-md gap-1.5',
      md: iconOnly ? 'p-2.5 text-sm rounded-lg' : 'px-4 py-2.5 text-sm rounded-lg gap-2',
      lg: iconOnly ? 'p-3.5 text-base rounded-xl' : 'px-6 py-3 text-base rounded-xl gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : iconOnly ? (
          iconOnly
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children && <span>{children}</span>}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
