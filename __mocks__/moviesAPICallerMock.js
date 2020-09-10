export default {
  getGenres: async () => {
    return {
      genres: [
        {
          id: 1,
          name: 'Action',
        },
        {
          id: 2,
          name: 'Mystery',
        },
        {
          id: 3,
          name: 'Drama',
        },
        {
          id: 4,
          name: 'Comedy',
        },
      ],
    };
  },
  getNowPlayingMovies: async (page = 1) => {
    return {
      page,
      results: [
        {
          title: 'Test Movie 1',
          genre_ids: [1, 2],
        },
        {
          title: 'Test Movie 2',
          genre_ids: [1],
        },
        {
          title: 'Test Movie 3',
          genre_ids: [],
        },
        {
          title: 'Test Movie 4',
          genre_ids: [1, 2, 3, 4],
        },
      ],
    };
  },
  getMoviesByKeyword: async () => {
    return [];
  },
  getMovieVideos: async () => {
    return [];
  },
  getMovieReviews: async () => {
    return {
      results: [
        {
          content: 'Test Review 1',
        },
        {
          content: 'Test Review 2',
        },
      ],
    };
  },
  getMovieSimilars: async () => {
    return [];
  },
};
