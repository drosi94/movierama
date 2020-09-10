import { MoviesAPICaller } from '../apiCaller/MoviesAPICaller';

export class MoviesService {
  constructor(mockApiCaller) {
    this._apiCaller = mockApiCaller || new MoviesAPICaller(process.env.API_URL);
  }

  async initData() {
    this.genres = await this.fetchGenres();
  }

  async fetchNowPlayingMovies(page = 1) {
    try {
      const moviesData = await this._apiCaller.getNowPlayingMovies(page);
      moviesData.results = await moviesData.results.map((movie) => {
        movie.genres = movie.genre_ids.map((genreId) => {
          const genre = this.genres.find((el) => el.id === genreId);
          return genre ? genre.name : '';
        });
        return movie;
      });
      return moviesData;
    } catch (err) {
      console.log('error fetch now playing movies', err);
    }
  }

  async fetchMoviesByKeyword(page = 1, query = '') {
    try {
      const moviesData = await this._apiCaller.getMoviesByKeyword(page, query);
      moviesData.results = await moviesData.results.map((movie) => {
        movie.genres = movie.genre_ids.map((genreId) => {
          const genre = this.genres.find((el) => el.id === genreId);
          return genre ? genre.name : '';
        });
        return movie;
      });
      return moviesData;
    } catch (err) {
      console.log('error fetch now playing movies', err);
    }
  }

  async fetchMovieTrailer(movieId) {
    try {
      const data = await this._apiCaller.getMovieVideos(movieId);
      if (data && data.results.length > 0) {
        const trailer = data.results.find(
          (el) => el.type === 'Trailer' && el.site === 'YouTube'
        );
        return trailer;
      } else {
        return null;
      }
    } catch (err) {
      console.log('error fetch now movie trailer', err);
    }
  }

  async fetchMovieReviews(movieId) {
    try {
      const data = await this._apiCaller.getMovieReviews(movieId);
      return data?.results;
    } catch (err) {
      console.log('error fetch now movie reviews', err);
    }
  }

  async fetchMovieSimilars(movieId) {
    try {
      const data = await this._apiCaller.getMovieSimilars(movieId);
      return data?.results;
    } catch (err) {
      console.log('error fetch now movie similars', err);
    }
  }

  async fetchGenres() {
    try {
      const data = await this._apiCaller.getGenres();
      return data.genres;
    } catch (err) {
      console.log('error fetch genres', err);
    }
  }
}
