
import React, { useState } from 'react';
import { Check, ChevronDown, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroupProps {
  label: string;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const FilterGroup = ({ label, options, selected, onChange }: FilterGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];
    
    onChange(newSelected);
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
      >
        <span>{label}</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen ? "transform rotate-180" : ""
        )} />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 p-2 bg-card rounded-lg shadow-lg border border-border z-30 animate-scale-in">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center px-2 py-1.5 rounded hover:bg-secondary cursor-pointer transition-colors"
                onClick={() => toggleOption(option.value)}
              >
                <div className={cn(
                  "w-4 h-4 rounded flex items-center justify-center mr-2",
                  selected.includes(option.value)
                    ? "bg-primary text-primary-foreground"
                    : "border border-muted-foreground/30"
                )}>
                  {selected.includes(option.value) && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
                <span className="text-sm">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface FilterSystemProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const FilterSystem = ({ onFilterChange }: FilterSystemProps) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    genres: [],
    years: [],
    rating: []
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  const updateFilter = (key: string, values: string[]) => {
    const newFilters = { ...activeFilters, [key]: values };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    const clearedFilters = Object.keys(activeFilters).reduce(
      (acc, key) => ({ ...acc, [key]: [] }),
      {} as Record<string, string[]>
    );
    setActiveFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };
  
  const hasActiveFilters = Object.values(activeFilters).some(v => v.length > 0);
  
  const genreOptions = [
    { label: 'Action', value: 'action' },
    { label: 'Adventure', value: 'adventure' },
    { label: 'Animation', value: 'animation' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Crime', value: 'crime' },
    { label: 'Documentary', value: 'documentary' },
    { label: 'Drama', value: 'drama' },
    { label: 'Family', value: 'family' },
    { label: 'Fantasy', value: 'fantasy' },
    { label: 'Horror', value: 'horror' },
    { label: 'Music', value: 'music' },
    { label: 'Mystery', value: 'mystery' },
    { label: 'Romance', value: 'romance' },
    { label: 'Science Fiction', value: 'science-fiction' },
    { label: 'Thriller', value: 'thriller' },
    { label: 'War', value: 'war' },
  ];
  
  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
  });
  
  const ratingOptions = [
    { label: '9+ Rating', value: '9' },
    { label: '8+ Rating', value: '8' },
    { label: '7+ Rating', value: '7' },
    { label: '6+ Rating', value: '6' },
    { label: '5+ Rating', value: '5' },
  ];
  
  return (
    <div className="p-4 rounded-xl bg-card border border-border/40 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          <h3 className="font-medium">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center text-xs px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3 mr-1" />
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
      
      <div 
        className={cn(
          "grid gap-3 transition-all duration-300 ease-in-out",
          isExpanded ? "grid-cols-1 md:grid-cols-4 opacity-100" : "grid-cols-1 md:grid-cols-3 opacity-100"
        )}
      >
        <FilterGroup
          label="Genres"
          options={genreOptions}
          selected={activeFilters.genres}
          onChange={(values) => updateFilter('genres', values)}
        />
        
        <FilterGroup
          label="Years"
          options={yearOptions}
          selected={activeFilters.years}
          onChange={(values) => updateFilter('years', values)}
        />
        
        <FilterGroup
          label="Rating"
          options={ratingOptions}
          selected={activeFilters.rating}
          onChange={(values) => updateFilter('rating', values)}
        />
        
        {isExpanded && (
          <div className="p-3 bg-secondary rounded-lg flex flex-col justify-center">
            <div className="text-xs text-muted-foreground mb-1">Active filters:</div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(activeFilters).flatMap(([key, values]) => 
                values.map(value => {
                  const option = 
                    key === 'genres' ? genreOptions.find(o => o.value === value) :
                    key === 'years' ? yearOptions.find(o => o.value === value) :
                    ratingOptions.find(o => o.value === value);
                  
                  return option ? (
                    <div 
                      key={`${key}-${value}`}
                      className="flex items-center text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {option.label}
                      <button 
                        onClick={() => updateFilter(key, values.filter(v => v !== value))}
                        className="ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : null;
                })
              )}
              {!hasActiveFilters && (
                <div className="text-xs text-muted-foreground">No active filters</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSystem;
