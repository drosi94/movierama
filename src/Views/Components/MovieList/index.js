import { CustomComponent, EventEmitter, Utils } from '../../../Utils/';
import { MoviesService } from '../../../Services/MoviesService';

const tagName = 'movierama-movie-list';
import template from './template.html';
import css from '!!raw-loader!postcss-loader!./styles.css';

const MOVIE_LIST_MODE = Object.freeze({
  LATEST: 'LATEST',
  SEARCH: 'SEARCH',
});

class MovieList extends CustomComponent {
  constructor() {
    super(template, css);
    this._service = new MoviesService();
    this.$searchContainer = undefined;
    this.$searchInput = undefined;
    this.$searchClearButton = undefined;
    this.$moviesContainer = undefined;
    this.$loaderContainer = undefined;
    this._searchChangeEvent = new EventEmitter('searchchange');
    this._movieExpandChangeEvent = new EventEmitter('movieexpandchange');
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

  async _populateMovies(showLoading = true, loadingElement) {
    if (showLoading) {
      this.$loaderContainer.classList.add('active');
    }
    const data =
      this._mode === MOVIE_LIST_MODE.LATEST
        ? await this._service.fetchNowPlayingMovies(this._page)
        : await this._service.fetchMoviesByKeyword(this._page, this._keyword);
    if (loadingElement) {
      this.$moviesContainer.removeChild(loadingElement);
    }
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
        this.$searchInput.style.removeProperty('width');
        this.$searchContainer.style.removeProperty('width');
        this.$searchContainer.classList.remove('active');
      }
    });
    const onInputListenerSearch = async (value) => {
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
    const onInputListenerResize = (value) => {
      if (!value) {
        value = this.$searchInput.value;
      }
      const inputWidth = this.$searchInput.offsetWidth;
      const charactersWidth = value.length * 10;
      if (charactersWidth >= inputWidth - 150) {
        this.$searchInput.style.width =
          this.$searchInput.offsetWidth + 80 + 'px';
        this.$searchContainer.style.width =
          this.$searchInput.offsetWidth + 80 + 'px';
      }
    };
    const debouncedInputListener = Utils.debounce(onInputListenerSearch, 500);
    this.$searchInput.addEventListener('input', (e) => {
      onInputListenerResize();
      debouncedInputListener(e.target.value);
    });

    this._searchChangeEvent.on((e) => {
      this.$searchInput.placeholder = '';
      this.$searchContainer.classList.add('active');
      this.$searchInput.value = e.detail.value;
      setTimeout(() => {
        onInputListenerResize(e.detail.value);
      }, 1300);
      onInputListenerSearch(e.detail.value);
    });
    this.$searchClearButton.addEventListener('click', () => {
      this.$searchInput.value = '';
      this.$searchInput.style.removeProperty('width');
      this.$searchContainer.style.removeProperty('width');
      this.$searchContainer.classList.remove('active');
      this.$searchInput.placeholder = placeholder;
      if (this._mode === MOVIE_LIST_MODE.SEARCH) {
        onInputListenerSearch('');
      }
    });
  }

  _infinityScrollFunctionality() {
    const onScrollListener = async () => {
      try {
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
          this.$moviesContainer.removeEventListener('scroll', onScrollListener);
          const loadingSkeleton = document.createElement(
            'movierama-movie-skeleton'
          );
          this.$moviesContainer.appendChild(loadingSkeleton);
          const data = await this._populateMovies(false, loadingSkeleton);
          if (data.total_pages > this._page) {
            this.$moviesContainer.addEventListener('scroll', onScrollListener);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    this.$moviesContainer.addEventListener('scroll', onScrollListener);

    this._movieExpandChangeEvent.on((e) => {
      if (!e.detail.expanded) {
        const currentScrollTop = this.$moviesContainer.scrollTop;
        const infoHeight = 300;
        const infoExpandedHeight = window.innerWidth > 1080 ? 1000 : 1500;
        const averageHeight = (infoHeight + infoExpandedHeight) / 2;
        const diff =
          currentScrollTop -
          averageHeight * Math.floor(currentScrollTop / averageHeight);
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
