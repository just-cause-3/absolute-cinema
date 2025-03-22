
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MovieGrid from '@/components/MovieGrid';
import { getMovies, Movie, filterMovies } from '@/services/movieService';
import FilterSystem from '@/components/FilterSystem';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Discover = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const movies = await getMovies();
        setAllMovies(movies);
        setFilteredMovies(movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 py-16 mt-16">
        <div className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-6">Discover Movies</h1>
          
          <FilterSystem onFilterChange={handleFilterChange} />
          
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 mt-8">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-[2/3] rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <MovieGrid movies={filteredMovies} className="mt-8" />
          )}
        </div>
      </main>
      
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

export default Discover;
