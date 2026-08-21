import React from 'react';
import { cn } from '@/lib/utils';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <PackageOpen className="w-12 h-12 text-gray-400" />,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 my-4', className)}>
      <div className="p-4 bg-gray-100 dark:bg-[#1A1A1A] rounded-2xl mb-4">{icon}</div>
      <h3 className="text-base font-bold text-[#111111] dark:text-white mb-1">{title}</h3>
      {description && <p className="text-xs text-gray-500 max-w-sm mb-6">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
