import React, { useState, useEffect } from 'react';
import { getMovies, filterMovies, Movie, getPopularMovies, getRecentMovies } from '@/services/movieService';
import Navbar from '@/components/Navbar';
import MovieGrid from '@/components/MovieGrid';
import MovieCard from '@/components/MovieCard';
import FilterSystem from '@/components/FilterSystem';
import LoadingStars from '@/components/LoadingStars';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [movies, popular, recent] = await Promise.all([
          getMovies(),
          getPopularMovies(),
          getRecentMovies()
        ]);
        
        setAllMovies(movies);
        setFilteredMovies(movies);
        setPopularMovies(popular);
        setRecentMovies(recent);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Keep loading state true for a moment to show the star filling animation
        setTimeout(() => {
          setIsLoading(false);
          // Hide the loading screen after all stars are filled
          setTimeout(() => {
            setShowLoadingAnimation(false);
          }, 2500);
        }, 1000);
      }
    };
    
    fetchData();
  }, []);
  
  const handleFilterChange = async (filters: Record<string, string[]>) => {
    const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);
    
    if (!hasActiveFilters) {
      setFilteredMovies(allMovies);
      return;
    }
    
    try {
      const results = await filterMovies(filters);
      setFilteredMovies(results);
    } catch (error) {
      console.error('Error filtering movies:', error);
    }
  };
  
  // Find a featured movie (random from popular movies)
  const featuredMovie = popularMovies.length > 0 
    ? popularMovies[Math.floor(Math.random() * popularMovies.length)]
    : null;

  return (
    <div className="min-h-screen bg-background">
      {showLoadingAnimation && <LoadingStars isLoading={isLoading} />}
      <Navbar />
      
      <main className="pb-16">
        {/* Hero section with featured movie */}
        {featuredMovie && (
          <div 
            className="relative h-[70vh] flex items-end"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${featuredMovie.backdropPath})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            
            <div className="container relative z-10 px-4 md:px-6 pb-16 md:pb-24">
              <div className="max-w-3xl animate-fade-in">
                <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary-foreground bg-primary rounded-full">
                  FEATURED
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-4 text-white">
                  {featuredMovie.title}
                </h1>
                <p className="text-base md:text-lg text-white/80 mb-6 line-clamp-2 md:line-clamp-3">
                  {featuredMovie.overview}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link 
                    to={`/movie/${featuredMovie.id}`}
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Play className="w-4 h-4 mr-2" /> Watch trailer
                  </Link>
                  <Link 
                    to={`/movie/${featuredMovie.id}`}
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="container px-4 md:px-6 py-12">
          {/* Recent movies section */}
          <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-display font-medium">Recently Added</h2>
              <Link 
                to="/discover"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View all <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="aspect-[2/3] rounded-xl bg-muted animate-pulse"
                  />
                ))
              ) : (
                recentMovies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.posterPath}
                    releaseDate={movie.releaseDate}
                    rating={movie.rating}
                    genres={movie.genres}
                  />
                ))
              )}
            </div>
          </section>
          
          {/* Popular movies section */}
          <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-display font-medium">Most Popular</h2>
              <Link 
                to="/discover"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View all <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="aspect-[2/3] rounded-xl bg-muted animate-pulse"
                  />
                ))
              ) : (
                popularMovies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.posterPath}
                    releaseDate={movie.releaseDate}
                    rating={movie.rating}
                    genres={movie.genres}
                  />
                ))
              )}
            </div>
          </section>
          
          {/* All movies with filters section */}
          <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-6">Discover Movies</h2>
            
            <FilterSystem onFilterChange={handleFilterChange} />
            
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="aspect-[2/3] rounded-xl bg-muted animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <MovieGrid movies={filteredMovies} />
            )}
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border/40 py-8">
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

export default Index;
