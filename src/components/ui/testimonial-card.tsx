import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  image?: string;
  rating: number;
  comment: string;
  amount?: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  image,
  rating,
  comment,
  amount,
  className
}) => {
  return (
    <Card className={cn('bg-gradient-card border-0 shadow-card transition-smooth hover:shadow-lg', className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-card-foreground">{name}</h4>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < rating ? 'fill-accent text-accent' : 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
          </div>
          {amount && (
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Gains</div>
              <div className="font-bold text-success">{amount}</div>
            </div>
          )}
        </div>
        <p className="text-muted-foreground italic">"{comment}"</p>
      </CardContent>
    </Card>
  );
};