import { CustomComponent, EventEmitter } from '../../../../Utils';
import noImage from '../../../../../public/img/no-image.png';

const tagName = 'movierama-movie-item';
import template from './template.html';

class MovieItem extends CustomComponent {
  constructor() {
    super(template);
    this.$movieContainer = undefined;
    this.$movieTitle = undefined;
    this.$moviePoster = undefined;
    this.$movieVoteAverage = undefined;
    this.$movieYearRelease = undefined;
    this.$movieGenres = undefined;
    this.$movieOverview = undefined;
    this.$movieOverviewPhone = undefined;
    this.$movieVideoContainer = undefined;
    this.$movieReviewListContainer = undefined;
    this.$movieSimilarListContainer = undefined;
    this._movieExpandChangeEvent = new EventEmitter('movieexpandchange');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
      // initialize element variables
      this.$movieContainer = this.shadowRoot.querySelector('#movie');
      this.$movieTitle = this.shadowRoot.querySelector('#movieTitle');
      this.$moviePoster = this.shadowRoot.querySelector('#moviePoster');
      this.$movieVoteAverage = this.shadowRoot.querySelector(
        '#movieVoteAverage'
      );
      this.$movieYearRelease = this.shadowRoot.querySelector(
        '#movieYearRelease'
      );
      this.$movieGenres = this.shadowRoot.querySelector('#movieGenres');
      this.$movieOverview = this.shadowRoot.querySelector('#movieOverview');
      this.$movieOverviewPhone = this.shadowRoot.querySelector(
        '#movieOverviewPhone'
      );
      this.$movieVideoContainer = this.shadowRoot.querySelector('#movieVideo');
      this.$movieReviewListContainer = this.shadowRoot.querySelector(
        '#movieReviews'
      );
      this.$movieSimilarListContainer = this.shadowRoot.querySelector(
        '#movieSimilars'
      );

      // init data
      this.$movieTitle.innerHTML += this.getAttribute('data-title');
      const posterPath = this.getAttribute('data-poster-path');
      if (posterPath !== 'null') {
        this.$moviePoster.src += this.getAttribute('data-poster-path');
      } else {
        this.$moviePoster.src = noImage;
      }
      this.$moviePoster.alt = this.getAttribute('data-title');
      this.$movieVoteAverage.innerHTML += this.getAttribute('data-vote');
      this.$movieYearRelease.innerHTML += this.getAttribute(
        'data-release-date'
      );
      this.$movieGenres.innerHTML += this.getAttribute('data-genres');
      this.$movieOverview.innerHTML += this.getAttribute('data-overview');
      this.$movieOverviewPhone.innerHTML += `<p>${this.getAttribute(
        'data-overview'
      )}</p>`;

      this._expandMovieFunctionality();
    }
  }

  _expandMovieFunctionality() {
    const createElement = (elementType, container) => {
      const el = document.createElement(elementType);
      el.setAttribute('data-movie-id', this.id);
      container.appendChild(el);
    };
    const clearElements = () => {
      this.$movieVideoContainer.removeChild(
        this.$movieVideoContainer.lastElementChild
      );
      this.$movieReviewListContainer.removeChild(
        this.$movieReviewListContainer.lastElementChild
      );
      this.$movieSimilarListContainer.removeChild(
        this.$movieSimilarListContainer.lastElementChild
      );
    };
    const toggleExpand = () => {
      this.$movieContainer.classList.toggle('expanded');
      if (!this.getAttribute('data-expanded')) {
        this.setAttribute('data-expanded', 'expanded');
        createElement('movierama-movie-trailer', this.$movieVideoContainer);
        createElement(
          'movierama-movie-review-list',
          this.$movieReviewListContainer
        );
        createElement(
          'movierama-movie-similar-list',
          this.$movieSimilarListContainer
        );
        this._movieExpandChangeEvent.emit('movieexpandchange', {
          expanded: true,
        });
      } else {
        this.removeAttribute('data-expanded');
        clearElements();
        this._movieExpandChangeEvent.emit({
          expanded: false,
        });
      }
    };
    this.$movieContainer.addEventListener('click', toggleExpand);
    this.$movieContainer.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        toggleExpand();
      }
    });
  }
}

customElements.define(tagName, MovieItem);
