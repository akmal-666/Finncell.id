import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={cn('flex items-center space-x-2 text-xs text-gray-500 py-3 overflow-x-auto', className)}>
      <Link to="/" className="flex items-center hover:text-[#111111] dark:hover:text-white transition-colors">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          {item.href && index < items.length - 1 ? (
            <Link to={item.href} className="hover:text-[#111111] dark:hover:text-white transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-[#111111] dark:text-white whitespace-nowrap">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
