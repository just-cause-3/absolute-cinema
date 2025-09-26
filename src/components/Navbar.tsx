
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Search, User, Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { searchMovies } from '@/services/movieService';
import { toast } from 'sonner';
import { useWatchlist } from '@/hooks/useWatchlist';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { watchlist } = useWatchlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Clear search when navigating
    setSearchValue('');
    setShowResults(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchValue.trim().length > 2) {
        const results = await searchMovies(searchValue);
        setSearchResults(results.slice(0, 5)); // Limit to 5 results
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/discover?search=${encodeURIComponent(searchValue)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (id: number) => {
    setSearchValue('');
    setShowResults(false);
    navigate(`/movie/${id}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-border/50 py-3' 
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="font-display text-2xl font-medium tracking-tight"
          >
            filmflow
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'Discover', path: '/discover' },
                { name: 'Genres', path: '/genres' },
                { name: 'Top Rated', path: '/top-rated' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary/90 relative py-1',
                    location.pathname === item.path 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  )}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
                  )}
                </Link>
              ))}
            </nav>

            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-9 w-[200px] rounded-full bg-secondary pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 focus:w-[280px]"
                />
              </div>
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                  <ul>
                    {searchResults.map((movie: any) => (
                      <li key={movie.id} className="border-b border-border last:border-0">
                        <button
                          onClick={() => handleResultClick(movie.id)}
                          className="flex items-center w-full p-3 text-left hover:bg-accent transition-colors"
                        >
                          <div className="w-8 h-12 bg-muted rounded overflow-hidden mr-3">
                            <img 
                              src={movie.posterPath} 
                              alt={movie.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{movie.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {movie.releaseDate.split('-')[0]} • {movie.genres.join(', ')}
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>

            <Link
              to="/watchlist"
              className="relative flex items-center justify-center h-9 w-9 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <User className="h-4 w-4" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground font-medium">
                  {watchlist.length}
                </span>
              )}
            </Link>

            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center h-9 w-9 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <Link to="/login">
              <button className="flex items-center justify-center h-9 w-9 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">Login</button>
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <Link
              to="/watchlist"
              className="relative flex items-center justify-center h-9 w-9 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <User className="h-4 w-4" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground font-medium">
                  {watchlist.length}
                </span>
              )}
            </Link>

            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center h-9 w-9 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button 
              className="flex items-center justify-center h-9 w-9 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-border/50 animate-fade-in">
          <div className="container px-4 py-4">
            <nav className="flex flex-col space-y-4 mb-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Discover', path: '/discover' },
                { name: 'Genres', path: '/genres' },
                { name: 'Top Rated', path: '/top-rated' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary/90 py-1',
                    location.pathname === item.path 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <form onSubmit={handleSubmit} className="relative mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-9 w-full rounded-full bg-secondary pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                  <ul>
                    {searchResults.map((movie: any) => (
                      <li key={movie.id} className="border-b border-border last:border-0">
                        <button
                          onClick={() => handleResultClick(movie.id)}
                          className="flex items-center w-full p-3 text-left hover:bg-accent transition-colors"
                        >
                          <div className="w-8 h-12 bg-muted rounded overflow-hidden mr-3">
                            <img 
                              src={movie.posterPath} 
                              alt={movie.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{movie.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {movie.releaseDate.split('-')[0]} • {movie.genres.join(', ')}
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
