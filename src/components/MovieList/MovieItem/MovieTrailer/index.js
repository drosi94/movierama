import { CustomComponent } from '../../../../utilities/CustomComponent';
import { MoviesService } from '../../../../services/MoviesService';

import template from './template.html';

const tagName = 'movierama-movie-trailer';

class MovieTrailer extends CustomComponent {
  constructor() {
    super(template);
    this._service = new MoviesService();

    this.$movieTrailerContainer = undefined;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
      this.$movieTrailerContainer = this.shadowDocument.querySelector(
        '#movieTrailerContainer'
      );
      const movieId = this.getAttribute('data-movie-id');
      const trailer = await this._service.fetchMovieTrailer(movieId);
      if (trailer?.key) {
        this.$movieTrailerContainer.querySelector(
          'iframe'
        ).src = `https://www.youtube.com/embed/${trailer.key}`;
      } else {
        this.$movieTrailerContainer.innerHTML = `<p>No trailer found</p>`;
      }
    }
  }
}

customElements.define(tagName, MovieTrailer);
