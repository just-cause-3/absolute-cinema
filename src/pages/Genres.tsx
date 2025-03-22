
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MovieGrid from '@/components/MovieGrid';
import { getMovies, Movie } from '@/services/movieService';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Genres = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const movies = await getMovies();
        setAllMovies(movies);
        
        // Extract all unique genres
        const uniqueGenres = Array.from(
          new Set(movies.flatMap(movie => movie.genres))
        ).sort();
        
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const getMoviesByGenre = (genre: string) => {
    if (genre === 'All') return allMovies;
    return allMovies.filter(movie => movie.genres.includes(genre));
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
          
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-8">Browse by Genre</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedGenre === 'All' ? 'default' : 'outline'}
              onClick={() => setSelectedGenre('All')}
              className="mb-2"
            >
              All
            </Button>
            {genres.map(genre => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? 'default' : 'outline'}
                onClick={() => setSelectedGenre(genre)}
                className="mb-2"
              >
                {genre}
              </Button>
            ))}
          </div>
          
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
            <MovieGrid 
              movies={getMoviesByGenre(selectedGenre)} 
              title={selectedGenre === 'All' ? 'All Movies' : `${selectedGenre} Movies`}
            />
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

export default Genres;
