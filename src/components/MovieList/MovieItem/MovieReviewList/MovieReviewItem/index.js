import { CustomComponent } from '../../../../../utilities/CustomComponent';

import template from './template.html';

const tagName = 'movierama-movie-review-item';

class MovieReviewItem extends CustomComponent {
  constructor() {
    super(template);
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
