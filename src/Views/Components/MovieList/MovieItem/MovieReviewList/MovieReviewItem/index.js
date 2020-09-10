import { CustomComponent } from '../../../../../../Utils';

const tagName = 'movierama-movie-review-item';
import template from './template.html';
import css from '!!raw-loader!postcss-loader!./styles.css'; 


export class MovieReviewItem extends CustomComponent {
  constructor() {
    super(template, css);
    this.$movieReviewContainer = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
      this.$movieReviewContainer = this.shadowRoot.querySelector(
        '#movieReviewContainer'
      );
      this.$movieReviewContainer.innerHTML = `<p>${this.getAttribute(
        'data-content'
      )}`;
    }
  }
}

customElements.define(tagName, MovieReviewItem);
