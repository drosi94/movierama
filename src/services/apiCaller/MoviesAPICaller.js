import { AjaxHttpCaller, objectToQueryParams } from '../../utilities';
import { HTTP_METHODS } from '../../enums/HTTP_METHODS';

export class MoviesAPICaller extends AjaxHttpCaller {
  constructor(apiUrl) {
    super(apiUrl);
    this._queryParams = {
      api_key: process.env.API_KEY,
      language: 'en-US',
    };
  }

  async getGenres() {
    return await super.sendRequest(
      HTTP_METHODS.GET,
      `genre/movie/list?${objectToQueryParams(this._queryParams)}`
    );
  }

  async getNowPlayingMovies(page = 1) {
    return await super.sendRequest(
      HTTP_METHODS.GET,
      `movie/now_playing?${objectToQueryParams(
        Object.assign(this._queryParams, { page })
      )}`
    );
  }

  async getMoviesByKeyword(page = 1, query = '') {
    return await super.sendRequest(
      HTTP_METHODS.GET,
      `search/movie?${objectToQueryParams(
        Object.assign(this._queryParams, { page, query })
      )}`
    );
  }

  async getMovieVideos(movieId) {
    return await super.sendRequest(
      HTTP_METHODS.GET,
      `movie/${movieId}/videos?${objectToQueryParams(this._queryParams)}`
    );
  }

  async getMovieReviews(movieId) {
    return await super.sendRequest(
      HTTP_METHODS.GET,
      `movie/${movieId}/reviews?${objectToQueryParams(this._queryParams)}`
    );
  }

  async getMovieSimilars(movieId) {
    return await super.sendRequest(
      HTTP_METHODS.GET,
      `movie/${movieId}/similar?${objectToQueryParams(this._queryParams)}`
    );
  }
}
