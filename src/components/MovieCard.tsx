
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Star, Heart, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import RatingSystem from './RatingSystem';
import { useWatchlist } from '@/hooks/useWatchlist';
import { toast } from '@/hooks/use-toast';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
  genres: string[];
}

const MovieCard = ({
  id,
  title,
  posterPath,
  releaseDate,
  rating,
  genres
}: MovieCardProps) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(id);
  
  const year = new Date(releaseDate).getFullYear();
  
  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    
    if (inWatchlist) {
      removeFromWatchlist(id);
      toast({
        title: "Removed from watchlist",
        description: `${title} has been removed from your watchlist`,
        variant: "default",
      });
    } else {
      addToWatchlist({
        id,
        title,
        posterPath,
        releaseDate,
        rating
      });
      toast({
        title: "Added to watchlist",
        description: `${title} has been added to your watchlist`,
        variant: "default",
      });
    }
  };
  
  return (
    <div 
      className="movie-card h-full overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative h-full flex flex-col bg-card shadow-sm rounded-xl overflow-hidden border border-border/40 dark:border-border/20 dark:bg-card/80">
        <div className="relative aspect-[2/3] overflow-hidden">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
              <Film className="w-10 h-10 text-muted-foreground/40" />
            </div>
          )}
          <img
            src={posterPath}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              isLoaded ? "opacity-100" : "opacity-0",
              isHovered ? "scale-105" : "scale-100"
            )}
            onLoad={() => setIsLoaded(true)}
          />
          
          <div className={cn(
            "absolute inset-x-0 bottom-0 p-4 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="backdrop-blur-card dark:bg-black/60 rounded-lg p-2 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-1.5 -ml-1">
                  <RatingSystem initialRating={Math.round(rating / 2)} readOnly size="sm" />
                  <span className="text-xs font-medium text-yellow-500">{rating.toFixed(1)}</span>
                </div>
                <button 
                  onClick={handleWatchlistClick}
                  className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center transition-colors",
                    inWatchlist 
                      ? "bg-primary/20 text-primary hover:bg-primary/30" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  )}
                  aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                >
                  {inWatchlist ? <Check className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5" />}
                </button>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {genres.slice(0, 2).map((genre) => (
                  <span 
                    key={genre} 
                    className="text-xs px-2 py-0.5 rounded-full bg-black/10 backdrop-blur-sm text-white dark:bg-white/10"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-medium leading-tight mb-1 line-clamp-2">{title}</h3>
          <p className="text-xs text-muted-foreground">{year}</p>
          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="flex items-center text-yellow-500">
              <Star className="w-3 h-3 fill-yellow-500 mr-1" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            </div>
            <button 
              onClick={handleWatchlistClick}
              className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center transition-colors text-muted-foreground",
                inWatchlist ? "text-primary" : ""
              )}
              aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              {inWatchlist ? <Check className="w-3.5 h-3.5" /> : <Heart className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
