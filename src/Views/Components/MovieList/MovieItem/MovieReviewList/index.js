import { CustomComponent } from '../../../../../Utils/CustomComponent';
import { MoviesService } from '../../../../../Services/MoviesService';

import template from './template.html';

const tagName = 'movierama-movie-review-list';

class MovieReviewList extends CustomComponent {
  constructor() {
    super(template);
    this._service = new MoviesService();

    this.$movieReviewsContainer = undefined;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
      this.$movieReviewsContainer = this.shadowRoot.querySelector(
        '#movieReviewsContainer'
      );
      const movieId = this.getAttribute('data-movie-id');
      const reviews = await this._service.fetchMovieReviews(movieId);

      if (reviews.length > 0) {
        reviews.forEach((review) => {
          const reviewElement = document.createElement(
            'movierama-movie-review-item'
          );
          reviewElement.setAttribute('data-content', review.content);
          this.$movieReviewsContainer.appendChild(reviewElement);
        });
      } else {
        this.$movieReviewsContainer.innerHTML = `<p>No reviews found</p>`;
      }
    }
  }
}

customElements.define(tagName, MovieReviewList);
