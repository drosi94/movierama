import { CustomComponent, EventEmitter } from '../../utilities';
import { throttle, debounce } from '../../utilities/Utils';
import { MoviesService } from '../../services/MoviesService';

const tagName = 'movierama-movie-list';
import template from './template.html';

const MOVIE_LIST_MODE = Object.freeze({
  LATEST: 'LATEST',
  SEARCH: 'SEARCH',
});

class MovieList extends CustomComponent {
  constructor() {
    super(template);
    this._service = new MoviesService();
    this.$searchContainer = undefined;
    this.$searchInput = undefined;
    this.$searchClearButton = undefined;
    this.$moviesContainer = undefined;
    this.$loaderContainer = undefined;
    this._searchChangeEvent = new EventEmitter();
    this._movieExpandChangeEvent = new EventEmitter();
    this._page = 1;
    this._keyword = '';
    this._mode = MOVIE_LIST_MODE.LATEST;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
      await this._service.initData();
      this.$searchContainer = this.shadowRoot.querySelector('#searchContainer');
      this.$searchInput = this.shadowRoot.querySelector('#search');
      this.$searchClearButton = this.shadowRoot.querySelector('#searchClear');

      this.$moviesContainer = this.shadowRoot.querySelector('#moviesContainer');
      this.$loaderContainer = this.shadowRoot.querySelector('#loaderContainer');
      this._searchInputFunctionality();
      const data = await this._populateMovies();
      if (data.total_pages > this._page) {
        this._infinityScrollFunctionality();
      }
    }
  }

  async _populateMovies(showLoading = true) {
    if (showLoading) {
      this.$loaderContainer.classList.add('active');
    }
    const data =
      this._mode === MOVIE_LIST_MODE.LATEST
        ? await this._service.fetchNowPlayingMovies(this._page)
        : await this._service.fetchMoviesByKeyword(this._page, this._keyword);
    this._appendMovieItemsInList(data.results);
    if (showLoading) {
      this.$loaderContainer.classList.remove('active');
    }

    return data;
  }

  _searchInputFunctionality() {
    const placeholder = this.$searchInput.placeholder;
    this.$searchInput.addEventListener('focus', () => {
      this.$searchInput.placeholder = '';
      this.$searchContainer.classList.add('active');
    });
    this.$searchInput.addEventListener('blur', () => {
      this.$searchInput.placeholder = placeholder;
      if (
        !this.$searchInput.value ||
        this.$searchInput.value.trim().length === 0
      ) {
        this.$searchContainer.classList.remove('active');
      }
    });
    const onInputListener = async (value) => {
      // Remove all listeners from moviesContainer by cloning it and replace the node
      const newMoviesContainer = this.$moviesContainer.cloneNode(false); // clone without the children
      this.$moviesContainer.parentElement.replaceChild(
        newMoviesContainer,
        this.$moviesContainer
      );
      this.$moviesContainer = newMoviesContainer;

      this._page = 1;
      if (!value || value.trim().length === 0) {
        this._keyword = '';
        this._mode = MOVIE_LIST_MODE.LATEST;
      } else {
        this._keyword = value;
        this._mode = MOVIE_LIST_MODE.SEARCH;
      }
      const data = await this._populateMovies();
      if (data.total_pages > this._page) {
        this._infinityScrollFunctionality();
      }
    };
    const debouncedInputListener = debounce(onInputListener, 500);
    this.$searchInput.addEventListener('input', (e) => {
      debouncedInputListener(e.target.value);
    });
    this._searchChangeEvent.on('searchchange', (e) => {
      this.$searchInput.placeholder = '';
      this.$searchContainer.classList.add('active');
      this.$searchInput.value = e.detail.value;
      onInputListener(e.detail.value);
    });
    this.$searchClearButton.addEventListener('click', () => {
      this.$searchInput.value = '';
      this.$searchContainer.classList.remove('active');
      this.$searchInput.placeholder = placeholder;
      if (this._mode === MOVIE_LIST_MODE.SEARCH) {
        onInputListener('');
      }
    });
  }

  _infinityScrollFunctionality() {
    const throttledScollListener = () =>
      throttle(onScrollListener.call(this), 50000);

    this.$moviesContainer.addEventListener('scroll', throttledScollListener);
    async function onScrollListener() {
      const infoExpandedHeight = window.innerWidth > 1080 ? 1000 : 1500;
      const infoHeight = 300;
      const movieItems = this.shadowRoot.querySelectorAll(
        'movierama-movie-item:not([data-expanded])'
      ).length;
      const expandedMovieItems = this.shadowRoot.querySelectorAll(
        'movierama-movie-item[data-expanded]'
      ).length;
      if (
        this.$moviesContainer.scrollTop +
          this.$moviesContainer.offsetHeight +
          300 >
        movieItems * infoHeight + expandedMovieItems * infoExpandedHeight
      ) {
        this._page++;
        this.$moviesContainer.removeEventListener(
          'scroll',
          throttledScollListener
        );
        const data = await this._populateMovies(false);
        if (data.total_pages > this._page) {
          this.$moviesContainer.addEventListener(
            'scroll',
            throttledScollListener
          );
        }
      }
    }

    this._movieExpandChangeEvent.on('movieexpandchange', (e) => {
      if (!e.detail.expanded) {
        const currentScrollTop = this.$moviesContainer.scrollTop;
        const infoHeight = 300;
        const infoExpandedHeight = window.innerWidth > 1080 ? 1000 : 1500;
        const averageHeight = (infoHeight + infoExpandedHeight) / 2;
        const diff =
          currentScrollTop -
          averageHeight * Math.floor(currentScrollTop / averageHeight);
        console.log(diff);
        if (diff > 0) {
          setTimeout(() => {
            this.$moviesContainer.scrollTop -= diff;
          }, 600);
        }
      }
    });
  }

  _appendMovieItemsInList(movies) {
    movies.forEach((movie) => {
      const movieItem = document.createElement('movierama-movie-item');
      movieItem.id = movie.id;
      movieItem.setAttribute('data-title', movie.title);
      movieItem.setAttribute('data-vote', movie.vote_average);
      movieItem.setAttribute('data-overview', movie.overview);
      movieItem.setAttribute('data-genres', movie.genres.join(', '));
      movieItem.setAttribute('data-release-date', movie.release_date);
      movieItem.setAttribute('data-poster-path', movie.poster_path);
      this.$moviesContainer.appendChild(movieItem);
    });
  }
}

customElements.define(tagName, MovieList);
