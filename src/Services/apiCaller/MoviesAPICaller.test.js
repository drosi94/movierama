import { MoviesAPICaller } from './MoviesAPICaller';
import { HTTP_STATUS } from '../enums/HTTP_STATUS';

describe('MoviesAPICaller', () => {
  it('should create new instance of MoviesAPICaller', () => {
    const apiCaller = new MoviesAPICaller('localhost');

    expect(apiCaller).not.toBeNull();
    expect(typeof apiCaller).toBe('object');

    expect(apiCaller.API_URL).toBe('localhost');

    expect(typeof apiCaller._queryParams).toBe('object');
    expect(Object.keys(apiCaller._queryParams).length).toBe(2);
    expect(apiCaller._queryParams.api_key).not.toBeUndefined();
    expect(apiCaller._queryParams.language).not.toBeUndefined();
    expect(apiCaller._queryParams.api_key).toBe(process.env.API_KEY);
    expect(apiCaller._queryParams.language).toBe('en-US');
  });

  it('should get an error object - server error', async () => {
    const apiCaller = new MoviesAPICaller('localhost');
    try {
      await apiCaller.getGenres();
    } catch (err) {
      expect(err).not.toBeNull();
      expect(err.status).toBe(HTTP_STATUS.SERVER_ERROR);
    }
  });

  it('should get a list of genres', async () => {
    const apiCaller = new MoviesAPICaller(process.env.API_URL);
    const genres = await apiCaller.getGenres();

    expect(apiCaller.API_URL).toBe(process.env.API_URL);

    expect(typeof genres).toBe('object');
    expect(genres).not.toBeNull();
  });

  it('should get a list of now playing movies', async () => {
    const apiCaller = new MoviesAPICaller(process.env.API_URL);
    const nowPlayingMovies = await apiCaller.getNowPlayingMovies();

    expect(apiCaller.API_URL).toBe(process.env.API_URL);

    expect(typeof nowPlayingMovies).toBe('object');
    expect(nowPlayingMovies).not.toBeNull();
    expect(nowPlayingMovies.total_pages).not.toBeNull();
    expect(nowPlayingMovies.page).not.toBeNull();
    expect(nowPlayingMovies.page).toBe(1);
  });

  it('should get a list of movies by keyword', async () => {
    const apiCaller = new MoviesAPICaller(process.env.API_URL);
    const movies = await apiCaller.getMoviesByKeyword(2, 'abc');

    expect(apiCaller.API_URL).toBe(process.env.API_URL);

    expect(typeof movies).toBe('object');
    expect(movies).not.toBeNull();
    expect(movies.total_pages).not.toBeNull();
    expect(movies.page).not.toBeNull();
    expect(movies.page).toBe(2);
  });
});
