import { CustomComponent } from '../../../../../utilities/CustomComponent';
import noImage from '../../../../../../public/img/no-image.png';

import template from './template.html';

const tagName = 'movierama-movie-similar-item';

class MovieSimilarItem extends CustomComponent {
  constructor() {
    super(template);
    this.$movieSimilarTitle = undefined;
    this.$movieSimilarPoster = undefined;
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
      this.$movieSimilarTitle.innerHTML = this.getAttribute('data-title');
      this.$movieSimilarPoster.alt = this.getAttribute('data-title');
      const posterPath = this.getAttribute('data-poster-path');
      if (posterPath !== 'null') {
        this.$movieSimilarPoster.src += posterPath;
      } else {
        this.$movieSimilarPoster.src = noImage;
      }
    }
  }
}

customElements.define(tagName, MovieSimilarItem);
