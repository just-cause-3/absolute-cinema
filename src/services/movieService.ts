export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  rating: number;
  genres: string[];
  runtime?: number;
  director?: string;
  cast?: string[];
}

// Base movie data
const baseMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterPath: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    releaseDate: "2010-07-16",
    rating: 8.4,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterPath: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    releaseDate: "1994-09-23",
    rating: 9.3,
    genres: ["Drama", "Crime"],
    runtime: 142,
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterPath: "https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    releaseDate: "2008-07-18",
    rating: 9.0,
    genres: ["Action", "Crime", "Drama", "Thriller"],
    runtime: 152,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    posterPath: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    releaseDate: "1994-10-14",
    rating: 8.9,
    genres: ["Crime", "Drama", "Thriller"],
    runtime: 154,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
  },
  {
    id: 5,
    title: "Forrest Gump",
    overview: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
    posterPath: "https://image.tmdb.org/t/p/w500/h5J4W4veyxMXDMjeNxZI46TsHOb.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    releaseDate: "1994-07-06",
    rating: 8.8,
    genres: ["Drama", "Romance"],
    runtime: 142,
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"]
  },
  {
    id: 6,
    title: "The Matrix",
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    posterPath: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    releaseDate: "1999-03-31",
    rating: 8.7,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    director: "Lana Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
  },
  {
    id: 7,
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterPath: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    releaseDate: "2014-11-07",
    rating: 8.6,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
  },
  {
    id: 8,
    title: "Parasite",
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    posterPath: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    releaseDate: "2019-05-30",
    rating: 8.5,
    genres: ["Comedy", "Drama", "Thriller"],
    runtime: 132,
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"]
  },
  {
    id: 9,
    title: "The Lion King",
    overview: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    posterPath: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/wXsQvli6tWqja8cci6a7cGGCmqR.jpg",
    releaseDate: "1994-06-24",
    rating: 8.5,
    genres: ["Animation", "Family", "Drama"],
    runtime: 88,
    director: "Roger Allers",
    cast: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"]
  },
  {
    id: 10,
    title: "Spirited Away",
    overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    posterPath: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/rrGmm0JQbgbYZUhH0UxmOBpOzgF.jpg",
    releaseDate: "2001-07-20",
    rating: 8.6,
    genres: ["Animation", "Family", "Fantasy"],
    runtime: 125,
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"]
  },
  {
    id: 11,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    posterPath: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
    releaseDate: "1972-03-14",
    rating: 9.2,
    genres: ["Crime", "Drama"],
    runtime: 175,
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"]
  },
  {
    id: 12,
    title: "Goodfellas",
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    posterPath: "https://image.tmdb.org/t/p/w500/6QMSLvU5ziIL2T6VrkaKzN2YkxK.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/gwj4R8Uy1GwejKgzwCJzGVlbkWM.jpg",
    releaseDate: "1990-09-12",
    rating: 8.7,
    genres: ["Crime", "Drama"],
    runtime: 146,
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
  },
  {
    id: 13,
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    posterPath: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/52AfXWuXCHn3UjD17rBruA9f5qb.jpg",
    releaseDate: "1999-10-15",
    rating: 8.8,
    genres: ["Drama", "Thriller"],
    runtime: 139,
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"]
  },
  {
    id: 14,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    overview: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    posterPath: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/vRQnzOn4HjIMX4LBq9nHhFXbsSu.jpg",
    releaseDate: "2001-12-18",
    rating: 8.8,
    genres: ["Adventure", "Fantasy", "Action"],
    runtime: 178,
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"]
  },
  {
    id: 15,
    title: "The Silence of the Lambs",
    overview: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    posterPath: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0Gg9vK9.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/mfwq2nMBzArzQ7Y9RKE8SKeeTkg.jpg",
    releaseDate: "1991-02-14",
    rating: 8.6,
    genres: ["Crime", "Drama", "Thriller", "Horror"],
    runtime: 118,
    director: "Jonathan Demme",
    cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"]
  },
  {
    id: 16,
    title: "Star Wars: Episode V - The Empire Strikes Back",
    overview: "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.",
    posterPath: "https://image.tmdb.org/t/p/w500/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/dMZxEdrWIzUmUoOz2zvmFuutbj7.jpg",
    releaseDate: "1980-05-20",
    rating: 8.7,
    genres: ["Adventure", "Action", "Sci-Fi"],
    runtime: 124,
    director: "Irvin Kershner",
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"]
  },
  {
    id: 17,
    title: "Schindler's List",
    overview: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    posterPath: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg",
    releaseDate: "1993-12-15",
    rating: 8.9,
    genres: ["History", "Drama", "War"],
    runtime: 195,
    director: "Steven Spielberg",
    cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"]
  },
  {
    id: 18,
    title: "The Departed",
    overview: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    posterPath: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq8ynEsbsl3h.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/r3JiOvjG0ppJgvZdpCLxC5eFSMD.jpg",
    releaseDate: "2006-10-05",
    rating: 8.5,
    genres: ["Drama", "Thriller", "Crime"],
    runtime: 151,
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"]
  },
  {
    id: 19,
    title: "Gladiator",
    overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    posterPath: "https://image.tmdb.org/t/p/w500/ehGpN04mLJIrSnxcZBMvHeG0eDc.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/hND7xAaxxBgaIsKeWX97KIgaT4Q.jpg",
    releaseDate: "2000-05-01",
    rating: 8.5,
    genres: ["Action", "Drama"],
    runtime: 155,
    director: "Ridley Scott",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"]
  },
  {
    id: 20,
    title: "The Green Mile",
    overview: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    posterPath: "https://image.tmdb.org/t/p/w500/8VG8fDNiy50H7stNvGSm9fEAm0D.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg",
    releaseDate: "1999-12-10",
    rating: 8.6,
    genres: ["Fantasy", "Drama", "Crime"],
    runtime: 189,
    director: "Frank Darabont",
    cast: ["Tom Hanks", "Michael Clarke Duncan", "David Morse"]
  },
  {
    id: 21,
    title: "Whiplash",
    overview: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    posterPath: "https://image.tmdb.org/t/p/w500/6uSPcdGMv4zRYEqnzBKLKPCGzgD.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/fRGxZuo7jJUWQsVg9PREb98Aclp.jpg",
    releaseDate: "2014-10-10",
    rating: 8.5,
    genres: ["Drama", "Music"],
    runtime: 107,
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist"]
  },
  {
    id: 22,
    title: "The Prestige",
    overview: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    posterPath: "https://image.tmdb.org/t/p/w500/5i3aXPNpJ6ZUG6hxAiY6y4lQDjq.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/63wf5t3iS7hK4aFwkb0s7fHesh6.jpg",
    releaseDate: "2006-10-19",
    rating: 8.5,
    genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"],
    runtime: 130,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Hugh Jackman", "Scarlett Johansson"]
  },
  {
    id: 23,
    title: "The Usual Suspects",
    overview: "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.",
    posterPath: "https://image.tmdb.org/t/p/w500/bUPmtQzrRhzqYySeiMpI612tLtU.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/m0xrThZDxmhQgK5cJ9B9Tris25s.jpg",
    releaseDate: "1995-07-19",
    rating: 8.5,
    genres: ["Crime", "Drama", "Mystery", "Thriller"],
    runtime: 106,
    director: "Bryan Singer",
    cast: ["Kevin Spacey", "Gabriel Byrne", "Chazz Palminteri"]
  },
  {
    id: 24,
    title: "Alien",
    overview: "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they soon realize that its life cycle has merely begun.",
    posterPath: "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/AmR3JG1VQVxU8TfAvljUhfSFUOx.jpg",
    releaseDate: "1979-05-25",
    rating: 8.5,
    genres: ["Horror", "Sci-Fi"],
    runtime: 117,
    director: "Ridley Scott",
    cast: ["Sigourney Weaver", "Tom Skerritt", "John Hurt"]
  },
  {
    id: 25,
    title: "Casablanca",
    overview: "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
    posterPath: "https://image.tmdb.org/t/p/w500/5K7cOHoay2mZusSLezBOY0Qxh8z.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/wOfzdzC0QZyhUIlyjJYrXnpjFDk.jpg",
    releaseDate: "1942-11-26",
    rating: 8.5,
    genres: ["Drama", "Romance", "War"],
    runtime: 102,
    director: "Michael Curtiz",
    cast: ["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid"]
  },
  {
    id: 26,
    title: "La La Land",
    overview: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    posterPath: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/jV9qdoDcPmUfVPEH76W9WFNnBt5.jpg",
    releaseDate: "2016-12-09",
    rating: 8.0,
    genres: ["Comedy", "Drama", "Music", "Romance"],
    runtime: 128,
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend"]
  },
  {
    id: 27,
    title: "Jurassic Park",
    overview: "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
    posterPath: "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/p83B8Z5XAdVWdyd8KdQMvU7Oa7Y.jpg",
    releaseDate: "1993-06-11",
    rating: 8.1,
    genres: ["Adventure", "Sci-Fi", "Thriller"],
    runtime: 127,
    director: "Steven Spielberg",
    cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum"]
  },
  {
    id: 28,
    title: "The Truman Show",
    overview: "An insurance salesman discovers his whole life is actually a reality TV show.",
    posterPath: "https://image.tmdb.org/t/p/w500/vuza0WqY6sUndYCs1zK77Xliyeu.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/5jK1FvvGwpgxgTSGSJKhKD6VHUa.jpg",
    releaseDate: "1998-06-05",
    rating: 8.1,
    genres: ["Comedy", "Drama"],
    runtime: 103,
    director: "Peter Weir",
    cast: ["Jim Carrey", "Laura Linney", "Noah Emmerich"]
  },
  {
    id: 29,
    title: "The Social Network",
    overview: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
    posterPath: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5ic3UwL4ZQu8o3R4S.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/8aeY0fJFP3Ad9rlYTTvjQRbjjzd.jpg",
    releaseDate: "2010-10-01",
    rating: 7.7,
    genres: ["Drama", "Biography"],
    runtime: 120,
    director: "David Fincher",
    cast: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"]
  },
  {
    id: 30,
    title: "Eternal Sunshine of the Spotless Mind",
    overview: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    posterPath: "https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/7MpZMmuAm6yNKTIKYAG9VnXYlxJ.jpg",
    releaseDate: "2004-03-19",
    rating: 8.3,
    genres: ["Drama", "Romance", "Sci-Fi"],
    runtime: 108,
    director: "Michel Gondry",
    cast: ["Jim Carrey", "Kate Winslet", "Tom Wilkinson"]
  }
];

// Combine all movies into one array
let mockMovies: Movie[] = [...baseMovies];

// Function to get all movies
export const getMovies = async (): Promise<Movie[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMovies);
    }, 500);
  });
};

export const getMovieById = async (id: number): Promise<Movie | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMovies.find(movie => movie.id === id));
    }, 300);
  });
};

export const getRecommendedMovies = async (movieId: number): Promise<Movie[]> => {
  // Simulate API call for related movies
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get random 5 movies that are not the current movie
      const filtered = mockMovies.filter(movie => movie.id !== movieId);
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, 5));
    }, 500);
  });
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by rating and return top 5
      const sorted = [...mockMovies].sort((a, b) => b.rating - a.rating);
      resolve(sorted.slice(0, 5));
    }, 400);
  });
};

export const getRecentMovies = async (): Promise<Movie[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by release date (newest first) and return top 5
      const sorted = [...mockMovies].sort(
        (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
      resolve(sorted.slice(0, 5));
    }, 400);
  });
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query.trim()) {
        resolve([]);
        return;
      }
      
      const lowerQuery = query.toLowerCase();
      const results = mockMovies.filter(
        movie => 
          movie.title.toLowerCase().includes(lowerQuery) || 
          movie.overview.toLowerCase().includes(lowerQuery) ||
          movie.genres.some(genre => genre.toLowerCase().includes(lowerQuery))
      );
      
      resolve(results);
    }, 300);
  });
};

export const filterMovies = async (filters: Record<string, string[]>): Promise<Movie[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockMovies];
      
      // Apply genre filters
      if (filters.genres && filters.genres.length > 0) {
        filtered = filtered.filter(movie => 
          movie.genres.some(genre => 
            filters.genres.includes(genre.toLowerCase())
          )
        );
      }
      
      // Apply year filters
      if (filters.years && filters.years.length > 0) {
        filtered = filtered.filter(movie => {
          const year = new Date(movie.releaseDate).getFullYear().toString();
          return filters.years.includes(year);
        });
      }
      
      // Apply rating filters
      if (filters.rating && filters.rating.length > 0) {
        const minRating = Math.min(...filters.rating.map(r => parseInt(r, 10)));
        filtered = filtered.filter(movie => movie.rating >= minRating);
      }
      
      resolve(filtered);
    }, 500);
  });
};
