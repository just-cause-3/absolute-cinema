
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, getRecommendedMovies, Movie } from '@/services/movieService';
import Navbar from '@/components/Navbar';
import MovieGrid from '@/components/MovieGrid';
import RatingSystem from '@/components/RatingSystem';
import { ArrowLeft, Calendar, Clock, Film, Play, User, Heart, Check } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  
  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const movieId = parseInt(id, 10);
        const [movieData, recommendations] = await Promise.all([
          getMovieById(movieId),
          getRecommendedMovies(movieId)
        ]);
        
        if (movieData) {
          setMovie(movieData);
          setRecommendedMovies(recommendations);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovie();
  }, [id]);
  
  const handleWatchlistToggle = () => {
    if (!movie) return;
    
    const movieId = movie.id;
    const inWatchlist = isInWatchlist(movieId);
    
    if (inWatchlist) {
      removeFromWatchlist(movieId);
      toast({
        title: "Removed from watchlist",
        description: `${movie.title} has been removed from your watchlist`,
        variant: "default",
      });
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate,
        rating: movie.rating
      });
      toast({
        title: "Added to watchlist",
        description: `${movie.title} has been added to your watchlist`,
        variant: "default",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 md:px-6 pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse-subtle">
            <Film className="w-16 h-16 text-muted" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 md:px-6 pt-24 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-medium mb-4">Movie not found</h1>
          <p className="text-muted-foreground mb-6">The movie you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
          </button>
        </div>
      </div>
    );
  }
  
  const inWatchlist = isInWatchlist(movie.id);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero section with movie backdrop */}
      <div 
        className="relative h-[60vh] sm:h-[70vh]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${movie.backdropPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      
      <div className="container px-4 md:px-6 -mt-32 sm:-mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 animate-fade-in">
          {/* Movie poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
            <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 aspect-[2/3] bg-card">
              <img 
                src={movie.posterPath} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Movie details */}
          <div className="flex-1">
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm mb-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium mb-3">
              {movie.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <RatingSystem initialRating={Math.round(movie.rating / 2)} readOnly />
              <span className="ml-2 text-sm">{movie.rating.toFixed(1)}/10</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span 
                  key={genre}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-secondary"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm">
              {movie.runtime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span>{movie.runtime} min</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                <span>{new Date(movie.releaseDate).getFullYear()}</span>
              </div>
              
              {movie.director && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span>{movie.director}</span>
                </div>
              )}
            </div>
            
            <p className="text-base leading-relaxed mb-8">
              {movie.overview}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Button className="inline-flex items-center">
                <Play className="w-4 h-4 mr-2" /> Watch trailer
              </Button>
              <Button 
                variant={inWatchlist ? "secondary" : "outline"} 
                onClick={handleWatchlistToggle}
                className="inline-flex items-center"
              >
                {inWatchlist ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> In watchlist
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" /> Add to watchlist
                  </>
                )}
              </Button>
            </div>
            
            {movie.cast && movie.cast.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor) => (
                    <span 
                      key={actor}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/50"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Recommended movies section */}
        {recommendedMovies.length > 0 && (
          <section className="mt-16 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-display font-medium mb-6">You might also like</h2>
            <MovieGrid movies={recommendedMovies} />
          </section>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border/40 py-8 mt-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-display text-xl font-medium mb-4 md:mb-0">
              filmflow
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} filmflow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MovieDetails;
