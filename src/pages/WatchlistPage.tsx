
import React from 'react';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Star } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();

  const handleRemove = (id: number, title: string) => {
    removeFromWatchlist(id);
    toast.success(`Removed "${title}" from watchlist`);
  };

  const handleClearWatchlist = () => {
    clearWatchlist();
    toast.success("Watchlist cleared successfully");
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
          
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-display font-medium">My Watchlist</h1>
            {watchlist.length > 0 && (
              <Button 
                variant="outline" 
                onClick={handleClearWatchlist}
                className="text-destructive border-destructive hover:bg-destructive/10"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Watchlist
              </Button>
            )}
          </div>
          
          {watchlist.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">Your watchlist is empty</h2>
              <p className="text-muted-foreground mb-6">Add movies to your watchlist to see them here</p>
              <Link to="/discover">
                <Button>Browse Movies</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {watchlist.map((movie) => (
                <Card key={movie.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <Link to={`/movie/${movie.id}`} className="sm:w-32 h-48 sm:h-auto overflow-hidden bg-muted">
                        <img 
                          src={movie.posterPath} 
                          alt={movie.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </Link>
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <Link to={`/movie/${movie.id}`}>
                              <h3 className="text-lg font-medium hover:text-primary transition-colors">
                                {movie.title}
                              </h3>
                            </Link>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span>{movie.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Added on {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemove(movie.id, movie.title)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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

export default WatchlistPage;
