
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MovieGrid from '@/components/MovieGrid';
import { getMovies, Movie } from '@/services/movieService';
import { ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TopRated = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const movies = await getMovies();
        // Sort by rating (highest first)
        const sorted = [...movies].sort((a, b) => b.rating - a.rating);
        setTopMovies(sorted);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const totalPages = Math.ceil(topMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = topMovies.slice(indexOfFirstMovie, indexOfLastMovie);

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
          
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-6">Top Rated Movies</h1>
          
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {currentMovies.map((movie, index) => (
                  <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <Card className="hover:bg-accent/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="font-display text-2xl font-medium w-8 text-center">
                            {indexOfFirstMovie + index + 1}
                          </div>
                          <div className="h-16 w-12 rounded bg-muted overflow-hidden">
                            <img 
                              src={movie.posterPath} 
                              alt={movie.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{movie.title}</h3>
                            <p className="text-sm text-muted-foreground">{movie.releaseDate.split('-')[0]}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="font-medium">{movie.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
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

export default TopRated;
