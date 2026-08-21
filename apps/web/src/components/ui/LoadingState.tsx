import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Memuat data...',
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <Loader2 className="w-8 h-8 animate-spin text-[#111111] dark:text-[#E7B65A] mb-3" />
      <p className="text-xs font-medium text-gray-500">{message}</p>
    </div>
  );
};
