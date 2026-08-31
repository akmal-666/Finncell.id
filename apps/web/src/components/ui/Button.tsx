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
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm';
    
    const variants = {
      primary: 'bg-[#1769E0] hover:bg-[#1769E0]/90 text-white focus:ring-[#1769E0]',
      secondary: 'bg-[#061426] hover:bg-[#0B1F3A] text-white focus:ring-[#061426] font-semibold',
      outline: 'border border-[#DCE5EF] hover:bg-[#F7F9FC] text-[#061426] focus:ring-gray-300 bg-white',
      ghost: 'hover:bg-gray-100 text-[#061426] focus:ring-gray-300',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      dark: 'bg-[#061426] hover:bg-[#0B1F3A] text-white border border-[#0B1F3A] focus:ring-slate-700',
      whatsapp: 'bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium focus:ring-[#25D366]',
    };

    const sizes = {
      sm: iconOnly ? 'p-1.5 text-xs rounded-md' : 'px-3 py-1.5 text-xs rounded-md gap-1.5',
      md: iconOnly ? 'p-2.5 text-sm rounded-md' : 'px-4 py-2.5 text-sm rounded-md gap-2',
      lg: iconOnly ? 'p-3.5 text-base rounded-md' : 'px-6 py-3 text-base rounded-md gap-2.5',
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
