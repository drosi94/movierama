import { MoviesService } from './MoviesService';
import moviesAPICallerMock from '../../../__mocks__/moviesAPICallerMock';

let service = undefined;
describe('MoviesService', () => {
  beforeAll(() => {
    service = new MoviesService(moviesAPICallerMock);
    service.initData();
  });
  it('should create new instance of MoviesService', () => {
    expect(service).not.toBeNull();
    expect(typeof service).toBe('object');
  });

  it('should get a list of genres', async () => {
    const genres = await service.fetchGenres();

    expect(genres).not.toBeNull();
    expect(genres.length).toBe(4);
    expect(genres[0].name).toBe('Action');
    expect(genres[1].name).toBe('Mystery');
    expect(genres[2].name).toBe('Drama');
    expect(genres[3].name).toBe('Comedy');
  });

  it('should get a list of now playing movies', async () => {
    const nowPlayingMovies = await service.fetchNowPlayingMovies(1);

    expect(nowPlayingMovies).not.toBeNull();
    expect(nowPlayingMovies.page).toBe(1);
    expect(nowPlayingMovies.results).not.toBeNull();
    expect(nowPlayingMovies.results.length).toBe(4);
    expect(nowPlayingMovies.results[0].genres).toStrictEqual([
      'Action',
      'Mystery',
    ]);
    expect(nowPlayingMovies.results[1].genres).toStrictEqual(['Action']);
    expect(nowPlayingMovies.results[2].genres).toStrictEqual([]);
    expect(nowPlayingMovies.results[3].genres).toStrictEqual([
      'Action',
      'Mystery',
      'Drama',
      'Comedy',
    ]);
  });
});
