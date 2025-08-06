
import React from 'react';
import { cn } from '@/lib/utils';

interface CoinAnimationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CoinAnimation: React.FC<CoinAnimationProps> = ({ 
  className, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={cn('relative', className)}>
      <div 
        className={cn(
          'rounded-full bg-gradient-to-br from-primary to-success animate-coin-spin hover-glow',
          'flex items-center justify-center text-primary-foreground font-bold',
          'shadow-glow border-2 border-primary/30',
          sizeClasses[size]
        )}
      >
        $
      </div>
      <div 
        className={cn(
          'absolute inset-0 rounded-full bg-gradient-to-br from-primary to-success',
          'animate-glow-pulse opacity-20',
          sizeClasses[size]
        )}
      />
    </div>
  );
};
