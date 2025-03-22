
import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../services/movieService';
import { cn } from '@/lib/utils';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  className?: string;
}

const MovieGrid = ({ movies, title, className }: MovieGridProps) => {
  if (!movies.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-xl font-medium mb-2">No movies found</h2>
        <p className="text-muted-foreground">Try adjusting your filters</p>
      </div>
    );
  }
  
  return (
    <div className={cn('movie-grid', className)}>
      {title && (
        <h2 className="text-2xl font-display font-medium mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            releaseDate={movie.releaseDate}
            rating={movie.rating}
            genres={movie.genres}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
