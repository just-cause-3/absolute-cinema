import React from 'react';
import { Star } from 'lucide-react';

interface LoadingStarsProps {
  isLoading: boolean;
}

const LoadingStars: React.FC<LoadingStarsProps> = ({ isLoading }) => {
  const [filledStars, setFilledStars] = React.useState(0);

  React.useEffect(() => {
    if (!isLoading) {
      // Fill stars one by one with a delay
      const fillStars = async () => {
        for (let i = 0; i <= 5; i++) {
          setFilledStars(i);
          await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay between each star
        }
      };
      fillStars();
    } else {
      setFilledStars(0);
    }
  }, [isLoading]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex items-center space-x-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <Star
            key={index}
            className={`w-8 h-8 transition-all duration-300 ${
              index < filledStars
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-muted-foreground/30'
            }`}
            style={{
              animation: index < filledStars ? 'starFill 0.3s ease-in-out forwards' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingStars; 