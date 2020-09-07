import { CustomComponent } from '../../../../../utilities/CustomComponent';
import { EventEmitter } from '../../../../../utilities/EventEmitter';

import noImage from '../../../../../../public/img/no-image.png';

import template from './template.html';

const tagName = 'movierama-movie-similar-item';

class MovieSimilarItem extends CustomComponent {
  constructor() {
    super(template);
    this.$movieSimilarTitle = undefined;
    this.$movieSimilarPoster = undefined;
    this.$movieSimilarLink = undefined;
    this._searchChangeEvent = new EventEmitter();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
      this.$movieSimilarTitle = this.shadowDocument.querySelector(
        '#movieSimilarTitle'
      );
      this.$movieSimilarPoster = this.shadowDocument.querySelector(
        '#movieSimilarPoster'
      );
      this.$movieSimilarLink = this.shadowDocument.querySelector(
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
      const onMovieSimilarClick = (e) => {
        e.stopPropagation();
        this._searchChangeEvent.emit('searchchange', {
          value: this.getAttribute('data-title'),
        });
      };
      this.$movieSimilarLink.addEventListener('click', onMovieSimilarClick);
      this.$movieSimilarLink.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
          onMovieSimilarClick();
        }
      });
    }
  }
}

customElements.define(tagName, MovieSimilarItem);
