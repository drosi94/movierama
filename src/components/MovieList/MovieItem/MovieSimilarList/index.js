import { CustomComponent } from '../../../../utilities/CustomComponent';
import { MoviesService } from '../../../../services/MoviesService';

import template from './template.html';

const tagName = 'movierama-movie-similar-list';

class MovieSimilarList extends CustomComponent {
  constructor() {
    super(template);
    this._service = new MoviesService();

    this.$movieSimilarsContainer = undefined;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
      this.$movieSimilarsContainer = this.shadowDocument.querySelector(
        '#movieSimilarsContainer'
      );
      const movieId = this.getAttribute('data-movie-id');
      const movieSimilars = await this._service.fetchMovieSimilars(movieId);
      if (movieSimilars.length > 0) {
        movieSimilars.forEach((movieSimilar) => {
          const similarElement = document.createElement(
            'movierama-movie-similar-item'
          );
          similarElement.setAttribute('data-title', movieSimilar.title);
          similarElement.setAttribute(
            'data-poster-path',
            movieSimilar.poster_path
          );
          this.$movieSimilarsContainer.appendChild(similarElement);
        });
      } else {
        this.$movieSimilarsContainer.innerHTML = `<p>No similar movies found</p>`;
      }
    }
  }
}

customElements.define(tagName, MovieSimilarList);
