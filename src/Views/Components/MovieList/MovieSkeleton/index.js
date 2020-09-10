import { CustomComponent } from '../../../../Utils/';

const tagName = 'movierama-movie-skeleton';
import template from './template.html';
import css from '!!raw-loader!postcss-loader!./styles.css'; 

class MovieSkeleton extends CustomComponent {
  constructor() {
    super(template, css);
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
    }
  }
}

customElements.define(tagName, MovieSkeleton);
