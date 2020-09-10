import { CustomComponent } from '../../../../../Utils';
import { MoviesService } from '../../../../../Services/MoviesService';

const tagName = 'movierama-movie-trailer';
import template from './template.html';
import css from '!!raw-loader!postcss-loader!./styles.css'; 

class MovieTrailer extends CustomComponent {
  constructor() {
    super(template, css);
    this._service = new MoviesService();

    this.$movieTrailerContainer = undefined;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
      this.$movieTrailerContainer = this.shadowRoot.querySelector(
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
