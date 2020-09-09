import { CustomComponent, EventEmitter } from '../../../../../../Utils/';

import noImage from '../../../../../../../public/img/no-image.png';

import template from './template.html';

const tagName = 'movierama-movie-similar-item';

class MovieSimilarItem extends CustomComponent {
  constructor() {
    super(template);
    this.$movieSimilarTitle = undefined;
    this.$movieSimilarPoster = undefined;
    this.$movieSimilarLink = undefined;
    this._searchChangeEvent = new EventEmitter('searchchange');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
      this.$movieSimilarTitle = this.shadowRoot.querySelector(
        '#movieSimilarTitle'
      );
      this.$movieSimilarPoster = this.shadowRoot.querySelector(
        '#movieSimilarPoster'
      );
      this.$movieSimilarLink = this.shadowRoot.querySelector(
        '#movieSimilarLink'
      );
      this.$movieSimilarTitle.innerHTML = this.getAttribute('data-title');
      this.$movieSimilarPoster.alt = this.getAttribute('data-title');
      const posterPath = this.getAttribute('data-poster-path');
      if (posterPath !== 'null') {
        this.$movieSimilarPoster.src += posterPath;
      } else {
        this.$movieSimilarPoster.src = noImage;
      }
      const onMovieSimilarClick = () => {
        this._searchChangeEvent.emit({
          value: this.getAttribute('data-title'),
        });
      };
      this.$movieSimilarLink.addEventListener('click', (e) => {
        e.stopPropagation();
        onMovieSimilarClick();
      });
      this.$movieSimilarLink.addEventListener('keypress', (e) => {
        e.stopPropagation();
        if (e.keyCode === 13) {
          onMovieSimilarClick();
        }
      });
    }
  }
}

customElements.define(tagName, MovieSimilarItem);
