
import { useState, useEffect } from 'react';

export interface WatchlistMovie {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const isInWatchlist = (id: number) => {
    return watchlist.some(movie => movie.id === id);
  };

  const addToWatchlist = (movie: WatchlistMovie) => {
    if (!isInWatchlist(movie.id)) {
      setWatchlist(prev => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== id));
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return {
    watchlist,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchlist
  };
}
