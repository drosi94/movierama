import { CustomComponent } from '../../../../../Utils/CustomComponent';
import { MoviesService } from '../../../../../Services/MoviesService';

const tagName = 'movierama-movie-review-list';
import template from './template.html';
import css from '!!raw-loader!postcss-loader!./styles.css'; 

class MovieReviewList extends CustomComponent {
  constructor() {
    super(template, css);
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
