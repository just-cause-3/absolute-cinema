
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingSystemProps {
  initialRating?: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
  readOnly?: boolean;
}

const RatingSystem = ({
  initialRating = 0,
  maxRating = 5,
  size = 'md',
  onChange,
  readOnly = false
}: RatingSystemProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = (value: number) => {
    if (readOnly) return;
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((value) => (
        <button
          key={value}
          type="button"
          className={cn(
            'transition-transform',
            value <= (hoveredRating || rating) ? 'transform scale-105' : '',
            readOnly ? 'cursor-default' : 'cursor-pointer'
          )}
          onClick={() => handleClick(value)}
          onMouseEnter={() => !readOnly && setHoveredRating(value)}
          onMouseLeave={() => !readOnly && setHoveredRating(0)}
          disabled={readOnly}
          aria-label={`Rate ${value} out of ${maxRating} stars`}
        >
          <Star 
            className={cn(
              sizes[size],
              'transition-colors duration-200',
              value <= (hoveredRating || rating) 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'fill-transparent text-gray-300'
            )} 
          />
        </button>
      ))}
    </div>
  );
};

export default RatingSystem;
